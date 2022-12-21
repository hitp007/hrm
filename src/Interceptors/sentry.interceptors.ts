import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as Sentry from "@sentry/minimal";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //  console.log("error run 1");
    return next.handle().pipe(
    
      tap(null,(data) => {
        // console.log("error run 2");
        Sentry.captureException(data);
      },null)
    );
  }
}
