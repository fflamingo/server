import { Request } from '../app/Request';
import { Response } from '../app/Response';

export type RouteHandler = (
  req: Request,
  res: Response
) => Response | Promise<Response>;
