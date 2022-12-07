import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    console.log('now');
    return next
      .handle()
      .pipe(
        map(
          (data) => ({  
          status: context.switchToHttp().getResponse().statusCode,
          data
        })
        )

      );
  }
}
