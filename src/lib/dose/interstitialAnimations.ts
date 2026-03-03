import type { DoseSectionKey } from "@/lib/dose/types";

export type LottieAnimationData = Record<string, unknown>;

const dopamine = {
  v: "5.10.0",
  fr: 30,
  ip: 0,
  op: 90,
  w: 300,
  h: 300,
  nm: "Dopamine",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Ring",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 90, s: [360] },
          ],
        },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [180, 180] },
              nm: "Ellipse Path 1",
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.9, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2,
              lj: 2,
              ml: 4,
              nm: "Stroke 1",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
          nm: "Ellipse 1",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

const oxytocin = {
  ...dopamine,
  nm: "Oxytocin",
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Pulse",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [60, 60, 100] },
            { t: 30, s: [110, 110, 100] },
            { t: 60, s: [60, 60, 100] },
            { t: 90, s: [60, 60, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [180, 180] },
              nm: "Ellipse Path 1",
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.45, 0.75, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2,
              lj: 2,
              ml: 4,
              nm: "Stroke 1",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
          nm: "Ellipse 1",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

const serotonin = {
  ...dopamine,
  nm: "Serotonin",
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Breathe",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [75, 75, 100] },
            { t: 45, s: [95, 95, 100] },
            { t: 90, s: [75, 75, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [200, 200] },
              nm: "Ellipse Path 1",
            },
            {
              ty: "st",
              c: { a: 0, k: [0.35, 0.75, 0.35, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2,
              lj: 2,
              ml: 4,
              nm: "Stroke 1",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
          nm: "Ellipse 1",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

const endorphins = {
  ...dopamine,
  nm: "Endorphins",
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Spin",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 90, s: [-360] },
          ],
        },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [180, 180] },
              nm: "Ellipse Path 1",
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.75, 0.2, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2,
              lj: 2,
              ml: 4,
              nm: "Stroke 1",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
          nm: "Ellipse 1",
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

export function getDoseInterstitialAnimation(section: DoseSectionKey): LottieAnimationData {
  switch (section) {
    case "dopamine":
      return dopamine;
    case "oxytocin":
      return oxytocin;
    case "serotonin":
      return serotonin;
    case "endorphins":
      return endorphins;
  }
}
