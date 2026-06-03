

# Correcao Definitiva do Sistema de Autenticacao Admin

## Problema Diagnosticado

Existem 3 problemas no fluxo atual:

1. **Operacao assincrona bloqueante dentro do `onAuthStateChange`**: O callback faz `await checkAdmin()` (chamada ao banco de dados), o que bloqueia o listener de autenticacao. A biblioteca Supabase exige que esse callback seja rapido e nao-bloqueante.

2. **Race condition no login**: Apos `window.location.replace("/admin")`, a pagina recarrega e o `AuthContext` reinicia do zero. O `ProtectedRoute` pode renderizar antes do `checkAdmin` terminar, vendo `isAdmin=false` e redirecionando para `/`.

3. **Login duplicado na pagina de login**: Se o usuario ja esta autenticado e acessa `/admin/login`, nada impede -- ele ve o formulario novamente.

## Solucao

### 1. AuthContext.tsx - Reescrever o bootstrap de autenticacao

**Mudancas:**
- Remover `await` de dentro do `onAuthStateChange` -- usar `setTimeout(fn, 0)` para despachar o `checkAdmin` sem bloquear o listener
- Simplificar o fluxo: `getSession()` faz o carregamento inicial, `onAuthStateChange` cuida de mudancas subsequentes
- Garantir que `loading` so vira `false` DEPOIS que `checkAdmin` completar
- O fluxo fica:

```text
1. getSession() -> obtem sessao do localStorage
2. Se tem sessao -> checkAdmin(user.id) -> seta isAdmin
3. setLoading(false) -- so agora
4. onAuthStateChange cuida de login/logout futuros
```

### 2. Login.tsx - Simplificar o fluxo pos-login

**Mudancas:**
- Apos `signIn()` com sucesso, chamar `await checkAdmin(user.id)` do contexto para atualizar o estado global
- Verificar `isAdminResult` via RPC para decidir navegacao
- Se admin: usar `window.location.href = "/admin"` (hard navigation, evita race condition do React Router)
- Se a pagina de login detectar que o usuario ja esta logado como admin, redirecionar automaticamente para `/admin`
- Remover importacao direta de `supabase` que era usada para check duplicado (manter apenas para `getUser`)

### 3. ProtectedRoute.tsx - Nenhuma mudanca necessaria

O componente ja esta correto: mostra loading enquanto `loading=true`, redireciona se nao autenticado ou nao admin.

### 4. App.tsx - Nenhuma mudanca necessaria

As rotas ja estao configuradas corretamente.

---

## Detalhes Tecnicos

### AuthContext.tsx - Codigo principal

```typescript
useEffect(() => {
  let mounted = true;

  // 1. Bootstrap: ler sessao persistida
  const bootstrap = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkAdmin(session.user.id);
      }
    } catch (err) {
      console.error("Auth bootstrap error:", err);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  // 2. Listener para mudancas futuras (login/logout)
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Nao bloquear o callback - despachar async
        setTimeout(() => {
          if (mounted) {
            checkAdmin(session.user.id).catch(() => setIsAdmin(false));
          }
        }, 0);
      } else {
        setIsAdmin(false);
      }
    }
  );

  bootstrap();

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);
```

### Login.tsx - Redirect automatico + fluxo simplificado

```typescript
// No topo do componente: se ja logado como admin, redirecionar
const { user, isAdmin, loading: authLoading, signIn, checkAdmin, signOut } = useAuth();

useEffect(() => {
  if (!authLoading && user && isAdmin) {
    window.location.replace("/admin");
  }
}, [authLoading, user, isAdmin]);
```

No `handleSubmit`:
```typescript
// Apos signIn com sucesso:
const { data: userData } = await supabase.auth.getUser();
await checkAdmin(userData.user.id); // atualiza estado global
// Verificar resultado
const { data: isAdminResult } = await supabase.rpc("is_admin", { _user_id: userData.user.id });
if (isAdminResult) {
  window.location.replace("/admin");
} else {
  await signOut();
  // toast de erro
}
```

## Resultado Esperado

- Login como admin -> entra no `/admin` (dashboard)
- F5 na pagina admin -> continua logado, `getSession` recupera sessao, `checkAdmin` confirma role
- Acessar `/admin` sem login -> redireciona para `/admin/login`
- Login como usuario comum -> mensagem "Acesso negado", faz signOut

