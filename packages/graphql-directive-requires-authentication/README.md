# GraphQL Directive: @requiresAuthentication

The point of this directive is not to validate JWT tokens, since this is frequently
a project-specific implementation. Instead it is expected that resolving token status
is done in the Apollo getContext hook, where the validated token is used to extend
the context object (user information).

This directive will only assert the "isAuthenticated" status coming from the context
object.

## Usage

To use the directive, you should start by adding the directive to your GraphQL schema:

```graphql
@directive requiresAuthentication on FIELD_DEFINITION
```

After this, you can create the directive by passing an `isAuthenticated` resolver
(and optionally a custom error) and the directive will do the rest:

```typescript
const requiresAuthentication = requiresAuthenticationDirective<Context>({
  isAuthenticated: (context) => !!context.auth?.token,
  throwError: new MyCustomError('WITH_CUSTOM_ERROR_CODE'),
})

new ApolloServer({
  schemaDirectives: {
    requiresAuthentication,
  },
})
```
