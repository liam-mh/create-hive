import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { Marker } from "react-native-maps";
import Svg, { Circle, Path, Defs, ClipPath, Image as SvgImage } from "react-native-svg";
import { Location } from "@/types/Location";
import { getImageUrl } from "@/hooks/useFirebaseStorage";
import { COLOURS, UNIT } from "@/styles";

interface CustomMarkerProps {
  coordinate: Location;
  folder: string;
  filename: string;
  size?: number;
}

const DEFAULT_SIZE = UNIT * 3;

const CustomMarker: React.FC<CustomMarkerProps> = ({ coordinate, folder, filename, size = DEFAULT_SIZE }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const circleRadius = size / 2;

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getImageUrl(folder, filename);
      setImageUri(url);

      if (url) {
        Image.getSize(url, (width, height) => {
          setImageSize({ width, height });
        });
      }
    };

    fetchImage();
  }, [folder, filename]);

  if (!imageUri || !imageSize) {
    return <ActivityIndicator size="small" color={COLOURS.primary} />;
  }

  const scaledWidth = (imageSize.width / imageSize.height) * (size - 4);

  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 1 }}>
      <Svg width={size} height={size + 10} viewBox={`0 0 ${size} ${size + 10}`}>
        {/* Triangle Pointer */}
        <Path
          d={`M${circleRadius - 6},${size - 4} L${circleRadius},${size + 8} L${circleRadius + 6},${size - 2} Z`}
          fill={COLOURS.primary}
        />

        {/* Circle Outline */}
        <Circle cx={circleRadius} cy={circleRadius} r={circleRadius - 2} fill="white" stroke={COLOURS.primary} strokeWidth={UNIT / 4} />

        {/* ClipPath Definition */}
        <Defs>
          <ClipPath id="clip-circle">
            <Circle cx={circleRadius} cy={circleRadius} r={circleRadius - 4} />
          </ClipPath>
        </Defs>

        {/* Image clipped inside the circle */}
        <SvgImage
          href={{ uri: imageUri }}
          width={scaledWidth} 
          height={size - 4} 
          x={(size - scaledWidth) / 2} 
          y={2}
          clipPath="url(#clip-circle)"
        />
      </Svg>
    </Marker>
  );
};

export default CustomMarker;