import { Request } from '../request/Request';

export type RouteHandler = (
  req: Request,
  res: Response
) => Response | Promise<Response>;
