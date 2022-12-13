import {MdNaturePeople, MdOutlineTheaterComedy, MdFastfood} from 'react-icons/md';
import {SiYoutubegaming} from 'react-icons/si';
import {GiAnimalSkull, GiLipstick, GiGalaxy} from 'react-icons/gi';
import {FaPaw, FaMedal} from 'react-icons/fa';

export const categories = [
    {
        name: 'nature',
        icon: <MdNaturePeople />,
      },
      {
        name: 'comedy',
        icon: <MdOutlineTheaterComedy />,
      },
      {
        name: 'gaming',
        icon: <SiYoutubegaming />,
      },
      {
        name: 'food',
        icon: <MdFastfood />,
      },
      {
        name: 'dance',
        icon: <GiGalaxy />,
      },
      {
        name: 'beauty',
        icon: <GiLipstick />,
      },
      {
        name: 'animals',
        icon: <FaPaw />,
      },
      {
        name: 'sports',
        icon: <FaMedal />,
      },
]