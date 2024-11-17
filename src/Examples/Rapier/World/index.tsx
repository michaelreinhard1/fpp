import { GroupProps } from "@react-three/fiber";

import { RapierWorldBalcony as Balcony } from "../../../Models/Balcony/Balcony";
import { RapierWorldBed as Bed } from "../../../Models/Bed/Bed";
import { RapierWorldBin as Bin } from "../../../Models/Bin/Bin";
import { RapierWorldCarpet as Carpet } from "../../../Models/Carpet/Carpet";
import { RapierWorldCeilingWindow as CeilingWindow } from "../../../Models/CeilingWindow/CeilingWindow";
import { RapierWorldChair as Chair } from "../../../Models/Chair/Chair";
import { RapierWorldCreditsBook as CreditsBook } from "../../../Models/CreditsBook/CreditsBook";
import { RapierWorldDesk as Desk } from "../../../Models/Desk/Desk";
import { RapierWorldSpeakers as Speakers } from "../../../Models/Desk/Speakers";
import { RapierWorldMonitor as Monitor } from "../../../Models/Monitor/Monitor";
import { RapierWorldOcean as Ocean } from "../../../Models/Ocean/Ocean";
import { RapierWorldPiano as Piano } from "../../../Models/Piano/Piano";
import { RapierWorldPlant as Plant } from "../../../Models/Plant/Plant";
import { RapierWorldProjects as Projects } from "../../../Models/Projects/Projects";
import { RapierWorldShelf as Shelf } from "../../../Models/Shelf/Shelf";
import { RapierWorldSkills as Skills } from "../../../Models/Skills/Skills";
import { RapierWorldSpotifyWrapped as SpotifyWrapped } from "../../../Models/SpotifyWrapped/SpotifyWrapped";
import { RapierWorldFloor as Floor } from "./Floor";
import { RapierWorldPlayer as Player } from "./Player";
import { RapierWorldWalls as Walls } from "./Walls";

const RapierWorld = (props: GroupProps) => {

  return (
    <group name="World" {...props}>
      <Floor />
      <Balcony />
      <Plant />
      <Skills />
      <Shelf />
      <Ocean />
      <Projects />
      <Walls />
      <CeilingWindow />
      <CreditsBook />
      <Piano />
      <Desk />
      <Monitor />
      <Speakers />
      <Bed />
      <Carpet />
      <Chair />
      <SpotifyWrapped />
      <Bin />
      <Player />
    </group>
  );
};

export { RapierWorld };