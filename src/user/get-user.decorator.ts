// // Custom Decorator
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from './entities/user.entities';

// export const GetUser = createParamDecorator(
//   (data: any, ctx: ExecutionContext): User => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );
