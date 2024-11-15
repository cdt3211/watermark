'use client'
import EXIF from 'exif-js';
import React, { useState } from 'react'

export default function Photo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [ISO, setISO] = useState(null)
  const [focalLength, setFocalLength] = useState(null)
  const [shutterSpeed, setShutterSpeed] = useState(null)
  const [fNumber, setFNumber] = useState(null)
  const [model, setModel] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleMakeWatermark = () => {
    if (selectedFile) {
      EXIF.getData(selectedFile, function () {
        const allTags = EXIF.getAllTags(this);
        setExifData(allTags);
        const fL = EXIF.getTag(this, 'FocalLengthIn35mmFilm');
        const fN = EXIF.getTag(this, 'FNumber');
        const shutterSpeedValue = EXIF.getTag(this, 'ShutterSpeedValue');
        const ISO = EXIF.getTag(this, 'ISOSpeedRatings');
        const model = EXIF.getTag(this, 'Model');
        setFocalLength(fL);
        setFNumber(fN?.numerator / fN?.denominator);
        setShutterSpeed(Math.round(Math.pow(2, Math.abs(shutterSpeedValue))));
        setISO(ISO);
        console.log(allTags);
        console.log(model);
      })
    }
  }
  return (
    <div className='flex flex-col'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleMakeWatermark}>watermark</button>
      <div>
        {focalLength}mm,
        F{fNumber},
        1/{shutterSpeed}s,
        {ISO}
      </div>
    </div>
  )
}
