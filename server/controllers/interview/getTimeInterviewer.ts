import { Response } from 'express';
import Interviewer from '../../database/Models/Interviewer';
import { RequestType } from '../../utils';

const getInterviewerAvailableTime = async (req: RequestType, res: Response) => {
  const { id } : any = req.userInfo;

  const { schedule } = await Interviewer.findOne({ userId: id });
  res.json({
    message: 'Schedule fetched successfully',
    data: schedule,
  });
};

export default getInterviewerAvailableTime;
