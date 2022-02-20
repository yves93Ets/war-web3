import redirect from '../../../lib/redirect';
import { useMoralis } from 'react-moralis';

export default function WithAuth(C: any) {
  //   const { isAuthUndefined } = useMoralis();
  const isAuthUndefined = false;
  if (!isAuthUndefined) return redirect(null, '/');
  return C;
}
