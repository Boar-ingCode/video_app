import React from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../AppNavigator";

type VideoPlayerScreenRouteProp = RouteProp<RootStackParamList, "VideoPlayer">;

const videoAssets: { [key: string]: any } = {
  "videos/sample1.mp4": require("../../assets/video/broadchurch.mp4"),
};

const VideoPlayerScreen: React.FC = () => {
  const route = useRoute<VideoPlayerScreenRouteProp>();
  const { videoPath } = route.params; 

  const videoSource = videoAssets[videoPath]; 
  if (!videoSource) {
    console.error(`Video not found for path: ${videoPath}`);
    return null; 
  }

  return (
    <View style={styles.container}>
      <Video
        source={videoSource}
        style={styles.videoPlayer}
        controls
        resizeMode="contain"
        onError={(error) => console.error("Video Error:", error)}
      />
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlayer: {
    width: "100%",
    height: 300,
  },
});
