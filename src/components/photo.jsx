'use client'

import EXIF from 'exif-js'
import Image from 'next/image'
import React, { useState } from 'react'
import { Camera, Upload, Aperture, Timer, Gauge } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Photo() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [exifData, setExifData] = useState({
    focalLength: null,
    fNumber: null,
    shutterSpeed: null,
    iso: null,
    model: null
  })

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setLoading(true)
    setSelectedFile(file)
    setImageUrl(URL.createObjectURL(file))

    try {
      await new Promise((resolve) => {
        EXIF.getData(file, function () {
          const allTags = EXIF.getAllTags(this)
          console.log('All EXIF tags:', allTags)
          const focalLengthIn35mm = EXIF.getTag(this, 'FocalLengthIn35mmFilm');
          const focalLength = EXIF.getTag(this, 'FocalLength');
          const fL = focalLengthIn35mm ? focalLengthIn35mm : (focalLength ? focalLength.numerator / focalLength.denominator : null); const fN = EXIF.getTag(this, 'FNumber')
          const shutterSpeedValue = EXIF.getTag(this, 'ShutterSpeedValue')
          const iso = EXIF.getTag(this, 'ISOSpeedRatings')
          const model = EXIF.getTag(this, 'Model')

          setExifData({
            focalLength: fL,
            fNumber: fN ? (fN.numerator / fN.denominator).toFixed(1) : null,
            shutterSpeed: shutterSpeedValue ? Math.round(Math.pow(2, Math.abs(shutterSpeedValue))) : null,
            iso: iso,
            model: model
          })
          resolve()
        })
      })
    } catch (error) {
      console.error('Error reading EXIF data:', error)
    } finally {
      setLoading(false)
    }
  }

  const ExifItem = ({ icon, label, value, unit = '' }) => {
    if (!value) return null
    return (
      <div className="flex items-center gap-2 text-sm">
        {icon}
        <span className="text-gray-500">{label}:</span>
        <span className="font-medium">
          {value}{unit}
        </span>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-6 h-6" />
          Photo EXIF Viewer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* File Upload */}
          <div className="flex justify-center">
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-500">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-500">
                {selectedFile ? 'Change photo' : 'Select a photo'}
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="relative w-full aspect-video">
              <Image
                src={imageUrl}
                alt="Selected photo"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* EXIF Data */}
          {loading ? (
            <div className="text-center text-gray-500">Loading EXIF data...</div>
          ) : (
            selectedFile && (
              <div className="grid gap-3">
                {exifData.model && (
                  <ExifItem
                    icon={<Camera className="w-4 h-4" />}
                    label="Camera"
                    value={exifData.model}
                  />
                )}
                <ExifItem
                  icon={<Timer className="w-4 h-4" />}
                  label="Focal Length"
                  value={exifData.focalLength}
                  unit="mm"
                />
                <ExifItem
                  icon={<Aperture className="w-4 h-4" />}
                  label="Aperture"
                  value={exifData.fNumber ? `ƒ/${exifData.fNumber}` : null}
                />
                <ExifItem
                  icon={<Timer className="w-4 h-4" />}
                  label="Shutter Speed"
                  value={exifData.shutterSpeed ? `1/${exifData.shutterSpeed}` : null}
                  unit="s"
                />
                <ExifItem
                  icon={<Gauge className="w-4 h-4" />}
                  label="ISO"
                  value={exifData.iso}
                />
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}