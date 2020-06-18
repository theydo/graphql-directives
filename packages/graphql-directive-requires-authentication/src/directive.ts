import {
	defaultFieldResolver,
	GraphQLField,
	GraphQLFieldResolver,
  } from 'graphql'
  import { SchemaDirectiveVisitor } from 'graphql-tools'
  import { AuthenticationError } from 'apollo-server-errors'
  
  export interface RequiresAuthenticationOptions<Context extends any> {
	isAuthenticated: (context: Context) => boolean;
	throwError?: Error;
  }
  
  export default <T extends any>(options: RequiresAuthenticationOptions<T>) => {
	const error = options.throwError || new AuthenticationError('Invalid authentication')
  
	return class RequiresAuthentication extends SchemaDirectiveVisitor {
	  resolver: GraphQLFieldResolver<any, T> = async (_, _args, context) => {
		if (!(await options.isAuthenticated(context))) {
		  throw error
		}
	  }
  
	  visitFieldDefinition(field: GraphQLField<any, any>) {
		const { resolve = defaultFieldResolver } = field
  
		field.resolve = (...args) => {
		  this.resolver(...args)
		  return resolve.call(this, ...args)
		}
	  }
	}
  }
  