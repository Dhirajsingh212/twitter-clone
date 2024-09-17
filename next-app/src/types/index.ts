export interface ResponseObj {
  ok: boolean;
  error: string | undefined;
  status: number;
  url: string | null;
  message?: string | null;
}
