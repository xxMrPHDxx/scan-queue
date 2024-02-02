import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean,
  message: string,
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (Math.random() < 0.5)
      throw new Error('Failed to scan!');
    res.status(200).json({
      success: true,
      message: 'Successfully scanned!',
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.toString()
    })
  }
}