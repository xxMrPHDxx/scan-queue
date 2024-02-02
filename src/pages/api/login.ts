import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).json({
    success: false,
    message: 'HTTP method not allowed!',
  })
  const { user, pass } = req.body
  if (user === 'admin' && pass === '12345')
    return res.status(200).json({
      success: true,
      message: 'Login success!',
    })
  return res.status(403).json({
    success: false,
    message: 'Invalid login!',
  })
}