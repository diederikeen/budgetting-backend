import { NextFunction, Response, Request } from "express";
import { supabase } from "..";

interface Req extends Request {
  headers: {
    authorization?: string;
  }
}

export async function authenticateUser(req: Req, res: Response, next: NextFunction) {
  try {
    const accessToken = req.headers?.authorization;

    const { data } = await supabase.auth.getUser(accessToken);

    if (data) {
      res.locals.user = data.user;
      next();
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Authentication token is invalid."})
  }
}
