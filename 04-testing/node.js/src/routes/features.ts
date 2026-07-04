import { type Request, type Response, Router } from 'express';
import getFlag, { getAllFlags } from '../data/feature-flag-repository.js';
import { FeatureFlags } from '../types/feature-flag.js';


export async function feature1Handler(req: Request, res: Response) {
  const feature1 = await getFlag(FeatureFlags.ONE);
  if (feature1) {
    res.json({message: 'Feature 1 is enabled'});
  } else {
    res.json({message: 'Feature 1 is disabled'});
  }
}

export async function feature2Handler(req: Request, res: Response) {
  const feature2 = await getFlag(FeatureFlags.TWO);
  if (feature2) {
    res.json({message: 'Feature 2 outputs json when enabled'});
  } else {
    res.send('Feature 2 outputs text when disabled');
  }
}

export async function feature3Handler(req: Request, res: Response) {
  const THREE = await getFlag(FeatureFlags.THREE);
  res.json({THREE});
}

export async function allHandler(req: Request, res: Response) {
  const flags = await getAllFlags();
  res.json(flags);
}

const router = Router();

router.get('/feature1', feature1Handler);
router.get('/feature2', feature2Handler);
router.get('/feature3', feature3Handler);
router.get('/all', allHandler);

export default router;
