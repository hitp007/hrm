import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().req.user);
    return ctx.getContext().req.user.admin;
    // const  req  = context.switchToHttp().getRequest();
}
}