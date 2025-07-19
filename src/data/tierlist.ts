type Role = 'DPS' | 'Support DPS' | 'Amplifier' | 'Sustain';
type Tier = 'T0' | 'T0_5' | 'T1' | 'T1_5' | 'T2' | 'T3' | 'T4' | 'T5';
type CharacterId = string;

type RoleGroup = {
  DPS: CharacterId[];
  'Support DPS': CharacterId[];
  Amplifier: CharacterId[];
  Sustain: CharacterId[];
};

type TierGroup = {
  [key in Tier]: RoleGroup;
};

type GameMode = 'Memory of Chaos' | 'Pure Fiction' | 'Apocalyptic Shadow';

type TierListData = {
  [key in GameMode]: TierGroup;
};

// Dữ liệu mẫu
const tierList: TierListData = {
  'Memory of Chaos': {
    T0: { DPS: ['castorice','acheron','therta','castorice','acheron','therta',  ], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T0_5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T1: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T1_5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T2: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T3: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T4: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
  },
  'Pure Fiction': {
    T0: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T0_5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T1: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T1_5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T2: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T3: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T4: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
  },
  'Apocalyptic Shadow': {
    T0: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T0_5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T1: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T1_5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T2: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T3: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T4: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T5: { DPS: [], 'Support DPS': [], Amplifier: [], Sustain: [] },
  }
};

export default tierList;
