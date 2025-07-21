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
    T0: { DPS: ['aglaea','anaxa','archer','castorice','phainon'], 'Support DPS': ['tribbie'], Amplifier: ['cipher','robin','sunday','male-remembrance'], Sustain: ['huohuo','hyacine'] },
    T0_5: { DPS: ['mydei','saber','therta'], 'Support DPS': ['jade'], Amplifier: ['ruan-mei','silver-wolf'], Sustain: ['aventurine','gallagher','lingsha'] },
    T1: { DPS: ['acheron','blade','feixiao','rappa','yunli'], 'Support DPS': ['argenti','black-swan','herta','kafka','topaz-numby'], Amplifier: ['bronya','jiaoqiu','sparkle','fugue'], Sustain: ['luocha'] },
    T1_5: { DPS: ['boothill','firefly','jing-yuan','jingliu'], 'Support DPS': ['march-7th-the-hunt','serval'], Amplifier: ['pela','tingyun'], Sustain: ['fu-xuan'] },
    T2: { DPS: ['himeko'], 'Support DPS': ['moze'], Amplifier: ['male-harmony'], Sustain: [] },
    T3: { DPS: ['clara','dr-ratio','dan-heng-imbibitor-lunae','qingque','seele'], 'Support DPS': [], Amplifier: ['asta','guinaifen'], Sustain: ['bailu','lynx'] },
    T4: { DPS: ['luka','xueyi'], 'Support DPS': ['sampo','welt'], Amplifier: ['hanya'], Sustain: ['gepard'] },
    T5: { DPS: ['arlan','dan-heng','hook','misha','sushang','male-destruction','yanqing'], 'Support DPS': [], Amplifier: ['yukong'], Sustain: ['march-7th','natasha','male-preservation'] },
  },
  'Pure Fiction': {
    T0: { DPS: ['castorice','therta'], 'Support DPS': ['jade','tribbie'], Amplifier: ['male-remembrance'], Sustain: ['hyacine'] },
    T0_5: { DPS: ['anaxa','argenti','phainon'], 'Support DPS': ['herta'], Amplifier: ['robin','ruan-mei','sunday'], Sustain: ['aventurine','huohuo','lingsha'] },
    T1: { DPS: ['acheron','blade','jing-yuan','rappa','saber'], 'Support DPS': ['black-swan','kafka','serval'], Amplifier: ['cipher','jiaoqiu','fugue'], Sustain: ['fu-xuan','gallagher','luocha'] },
    T1_5: { DPS: ['aglaea','mydei'], 'Support DPS': [], Amplifier: ['pela','silver-wolf','sparkle','male-harmony'], Sustain: [] },
    T2: { DPS: ['himeko','yunli'], 'Support DPS': [], Amplifier: ['bronya','tingyun'], Sustain: [] },
    T3: { DPS: ['clara','feixiao','firefly','jingliu'], 'Support DPS': [], Amplifier: [], Sustain: ['gepard'] },
    T4: { DPS: ['dan-heng-imbibitor-lunae','qingque','seele','xueyi'], 'Support DPS': ['march-7th-the-hunt','topaz-numby','welt'], Amplifier: ['asta','guinaifen'], Sustain: ['bailu','lynx'] },
    T5: { DPS: ['archer','arlan','boothill','dan-heng','dr-ratio','hook'], 'Support DPS': ['moze','sampo'], Amplifier: ['hanya','yukong'], Sustain: ['march-7th','natasha','male-preservation'] },
  },
  'Apocalyptic Shadow': {
    T0: { DPS: ['anaxa','archer','castorice','feixiao','phainon','therta'], 'Support DPS': ['tribbie'], Amplifier: ['cipher','robin','ruan-mei','silver-wolf','sunday','male-remembrance'], Sustain: ['hyacine'] },
    T0_5: { DPS: ['aglaea','boothill','firefly','mydei','saber'], 'Support DPS': ['jade','march-7th-the-hunt'], Amplifier: ['bronya','sparkle','fugue'], Sustain: ['aventurine','gallagher','huohuo','lingsha'] },
    T1: { DPS: ['acheron','jingliu','rappa'], 'Support DPS': ['argenti','herta','topaz-numby'], Amplifier: ['jiaoqiu','tingyun','male-harmony'], Sustain: ['fu-xuan','luocha'] },
    T1_5: { DPS: ['blade','yunli'], 'Support DPS': ['black-swan','kafka','serval'], Amplifier: ['pela'], Sustain: [] },
    T2: { DPS: ['himeko','jing-yuan'], 'Support DPS': ['moze'], Amplifier: [], Sustain: ['bailu','gepard'] },
    T3: { DPS: ['clara','dr-ratio','dan-heng-imbibitor-lunae','seele'], 'Support DPS': [], Amplifier: ['asta','hanya'], Sustain: ['lynx'] },
    T4: { DPS: ['qingque','sushang','xueyi'], 'Support DPS': ['welt'], Amplifier: ['guinaifen','yukong'], Sustain: [] },
    T5: { DPS: ['arlan','dan-heng','hook','luka','misha','male-destruction','yanqing'], 'Support DPS': ['sampo'], Amplifier: [], Sustain: ['march-7th','natasha','male-preservation'] },
  }
};

export default tierList;
