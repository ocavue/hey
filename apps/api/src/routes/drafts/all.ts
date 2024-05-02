import type { Handler } from 'express';

import logger from '@hey/helpers/logger';
import parseJwt from '@hey/helpers/parseJwt';
import catchedError from 'src/helpers/catchedError';
import validateLensAccount from 'src/helpers/middlewares/validateLensAccount';
import prisma from 'src/helpers/prisma';
import { notAllowed } from 'src/helpers/responses';

// TODO: add tests
export const get: Handler = async (req, res) => {
  const accessToken = req.headers['x-access-token'] as string;

  // if (!(await validateLensAccount(req))) {
  //   return notAllowed(res);
  // }

  try {
    const payload = parseJwt(accessToken);
    console.log(`Finding draftPublication from profileId ${payload.id}`);
    const result = await prisma.draftPublication.findMany({
      orderBy: { updatedAt: 'desc' },
      where: { profileId: payload.id }
    });

    logger.info(`Drafts fetched for ${payload.id}`);

    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.log('/drafts/all ERROR', error);

    return catchedError(res, error);
  }
};
