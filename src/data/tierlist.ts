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
    T0: { DPS: ['anaxa','archer','castorice','hysilens','phainon'], 'Support DPS': ['tribbie'], Amplifier: ['cipher','robin','sunday','male-remembrance'], Sustain: ['huohuo','hyacine'] },
    T0_5: { DPS: ['aglaea','mydei','saber','therta'], 'Support DPS': ['jade','kafka'], Amplifier: ['bronya','ruan-mei','silver-wolf','sparkle'], Sustain: ['aventurine','gallagher','lingsha'] },
    T1: { DPS: ['acheron','blade','feixiao','jingliu','yunli'], 'Support DPS': ['argenti','black-swan','herta','topaz-numby'], Amplifier: ['jiaoqiu','tingyun'], Sustain: ['luocha'] },
    T1_5: { DPS: ['boothill','firefly','jing-yuan','rappa'], 'Support DPS': ['march-7th-the-hunt','serval'], Amplifier: ['pela','fugue'], Sustain: ['fu-xuan'] },
    T2: { DPS: ['himeko'], 'Support DPS': ['moze'], Amplifier: ['male-harmony'], Sustain: [] },
    T3: { DPS: ['clara','dr-ratio','dan-heng-imbibitor-lunae','qingque','seele'], 'Support DPS': [], Amplifier: ['asta','guinaifen'], Sustain: ['bailu','lynx'] },
    T4: { DPS: ['luka','xueyi'], 'Support DPS': ['sampo','welt'], Amplifier: ['hanya'], Sustain: ['gepard'] },
    T5: { DPS: ['arlan','dan-heng','hook','misha','sushang','male-destruction','xueyi','yanqing'], 'Support DPS': [], Amplifier: ['yukong'], Sustain: ['march-7th','natasha','male-preservation'] },
  },
  'Pure Fiction': {
    T0: { DPS: ['castorice','therta'], 'Support DPS': ['jade','tribbie'], Amplifier: ['male-remembrance'], Sustain: ['hyacine'] },
    T0_5: { DPS: ['anaxa','argenti','hysilens','phainon'], 'Support DPS': ['herta','kafka'], Amplifier: ['cipher','robin','ruan-mei','sunday'], Sustain: ['aventurine','huohuo','lingsha'] },
    T1: { DPS: ['acheron','blade','jing-yuan','rappa','saber'], 'Support DPS': ['black-swan','serval'], Amplifier: ['bronya','jiaoqiu','sparkle','tingyun','fugue'], Sustain: ['fu-xuan','gallagher','luocha'] },
    T1_5: { DPS: ['aglaea','mydei'], 'Support DPS': [], Amplifier: ['pela','silver-wolf','male-harmony'], Sustain: [] },
    T2: { DPS: ['himeko','yunli'], 'Support DPS': [], Amplifier: [], Sustain: [] },
    T3: { DPS: ['clara','feixiao','firefly','jingliu'], 'Support DPS': [], Amplifier: [], Sustain: ['bailu','lynx'] },
    T4: { DPS: ['seele'], 'Support DPS': ['march-7th-the-hunt','topaz-numby'], Amplifier: ['guinaifen'], Sustain: ['gepard'] },
    T5: { DPS: ['archer','arlan','boothill','dan-heng','dr-ratio','hook','dan-heng-imbibitor-lunae','luka','misha','qingque','sushang','male-destruction','xueyi','yanqing'], 'Support DPS': ['moze','sampo','welt'], Amplifier: ['asta','hanya','yukong'], Sustain: ['march-7th','natasha','male-preservation'] },
  },
  'Apocalyptic Shadow': {
    T0: { DPS: ['anaxa','archer','castorice','feixiao','phainon'], 'Support DPS': ['tribbie'], Amplifier: ['cipher','robin','ruan-mei','silver-wolf','sunday','male-remembrance'], Sustain: ['hyacine'] },
    T0_5: { DPS: ['aglaea','boothill','firefly','mydei','saber','therta'], 'Support DPS': ['march-7th-the-hunt'], Amplifier: ['bronya','sparkle','tingyun','fugue'], Sustain: ['aventurine','gallagher','huohuo','lingsha'] },
    T1: { DPS: ['blade','hysilens','rappa'], 'Support DPS': ['jade','kafka','topaz-numby'], Amplifier: ['jiaoqiu','male-harmony'], Sustain: ['fu-xuan','luocha'] },
    T1_5: { DPS: ['acheron','jingliu','yunli'], 'Support DPS': ['argenti','black-swan','herta'], Amplifier: ['pela'], Sustain: [] },
    T2: { DPS: ['himeko','jing-yuan'], 'Support DPS': ['moze','serval'], Amplifier: [], Sustain: ['bailu','gepard'] },
    T3: { DPS: ['clara','dr-ratio','dan-heng-imbibitor-lunae','seele'], 'Support DPS': [], Amplifier: ['asta','hanya'], Sustain: ['lynx'] },
    T4: { DPS: ['sushang','xueyi'], 'Support DPS': ['welt'], Amplifier: ['guinaifen','yukong'], Sustain: [] },
    T5: { DPS: ['arlan','dan-heng','hook','luka','misha','qingque','male-destruction','yanqing'], 'Support DPS': ['sampo'], Amplifier: [], Sustain: ['march-7th','natasha','male-preservation'] },
  }
};

export default tierList;
