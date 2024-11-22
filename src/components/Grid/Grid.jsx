import React from 'react';
import Preset from '../Preset/Preset';
import './Grid.scss';
import YogaVideo from '../../assets/yoga.mp4';
import TaiChiVideo from '../../assets/tai_chi.mp4';
import StretchingVideo from '../../assets/stretching.mp4';
import DancingVideo from '../../assets/dancing.mp4';


const Grid = () => {

    const presets = [

        {pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg", title: "Yoga", video: YogaVideo},
        {pictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdOTtKr1QiIWs7JpNhAm7qkUeF47ddjsv8pw&usqp=CAU", title: "Tai Chi",video: TaiChiVideo},
        {pictureUrl: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",title: "Stretching",video: StretchingVideo},
        {pictureUrl: "https://www.shutterstock.com/image-photo/full-length-excited-funny-young-260nw-1967652817.jpg",title: "Dancing",video: DancingVideo},
        {pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg",title: "Preset 5",video: YogaVideo},
        {pictureUrl: "https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg",title: "Preset 6",video: YogaVideo},
    
    ];

//     return (
//     <div>
//       <h1>Some Presets for you to try</h1>
//       <div>
//         {presets.map((pre, index) => (
//           <Preset key={index} pictureUrl={pre.pictureUrl} title={pre.title} video={pre.video} />
//         ))}
//       </div>
//     </div>
//   );

// };
return (
    <div id="experience">
        <div className="experience-container" id="workExperience">
          <div>
            <h1 className="experience-heading">Some Presets for you to try</h1>
            <div className="experience-cards-div">
            {presets.map((pre, index) => (
            <Preset key={index} pictureUrl={pre.pictureUrl} title={pre.title} video={pre.video} />
            ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Grid;