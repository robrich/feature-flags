import Router from 'express-promise-router';
import { Request, Response } from 'express';
import getFlag, { getAllFlags } from '../data/feature-flag-repository.js';
import { FeatureFlags } from '../types/feature-flag.js';


const router = Router();

router.get('/feature1', async function (req: Request, res: Response) {
  const feature1 = await getFlag(FeatureFlags.ONE);
  if (feature1) {
    res.json({message: 'Feature 1 is enabled'});
  } else {
    res.json({message: 'Feature 1 is disabled'});
  }
});

router.get('/feature2', async function (req: Request, res: Response) {
  const feature1 = await getFlag(FeatureFlags.TWO);
  if (feature1) {
    res.json({message: 'Feature 2 outputs json when enabled'});
  } else {
    res.send('Feature 2 outputs text when disabled');
  }
});

router.get('/feature3', async function (req: Request, res: Response) {
  const feature3 = await getFlag(FeatureFlags.THREE);
  res.json({feature3});
});

router.get('/all', async function (req: Request, res: Response) {
  const flags = await getAllFlags();
  res.json(flags);
});

export default router;
