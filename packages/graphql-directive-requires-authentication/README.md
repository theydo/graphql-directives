# GraphQL Directive: @requiresAuthentication

This directive will throw an AuthenticationError if the context of the query operation
that implements this directive does not meet the criteria of "being authenticated".

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
