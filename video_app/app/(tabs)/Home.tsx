import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  Image
} from "react-native";
import SearchIcon from "../../assets/icons/search-icon.svg";
import SettingsIcon from "../../assets/icons/settings-icon.svg";
import HomeIcon from "../../assets/icons/home-icon.svg";
import { WebView } from "react-native-webview";

const API_KEY = "AIzaSyDCT4LQMeXn-TVHSkGZlV2VZTdEQ-F_f5c"; 

const HomeScreen: React.FC = () => {
  const [reactNativeVideos, setReactNativeVideos] = useState<any[]>([]);
  const [reactVideos, setReactVideos] = useState<any[]>([]);
  const [typescriptVideos, setTypescriptVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async (
      query: string,
      setState: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      try {
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${query}&type=video&part=snippet&maxResults=2`
        );
        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
          console.error(`No videos found for query: ${query}`, searchData);
          return;
        }

        const videoIds = searchData.items
          .map((item: any) => item.id.videoId)
          .join(",");

        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics`
        );
        const detailsData = await detailsResponse.json();

        if (!detailsData.items || detailsData.items.length === 0) {
          console.error(`No video details found for query: ${query}`, detailsData);
          return;
        }

        setState(detailsData.items);
      } catch (error) {
        console.error(`Error fetching ${query} videos:`, error);
      }
    };

    const fetchAllVideos = async () => {
      setLoading(true);
      await Promise.all([
        fetchVideos("react+native+tutorial", setReactNativeVideos),
        fetchVideos("react+tutorial", setReactVideos),
        fetchVideos("typescript+tutorial", setTypescriptVideos),
      ]);
      setLoading(false);
    };

    fetchAllVideos();
  }, []);

  const renderVideoItem = ({ item }: { item: any }) => {
    const publicationDate = new Date(item.snippet.publishedAt).toLocaleDateString();

    return (
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => setSelectedVideoId(item.id)}
      >
        <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.snippet.title}
          </Text>
          <Text style={styles.videoDate}>{publicationDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategory = (title: string, videos: any[], onShowMore: () => void) => (
    <View style={styles.category}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryText}>{title}</Text>
        <TouchableOpacity onPress={onShowMore}>
          <Text style={styles.showMoreText}>Show more</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#2B2D42" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={renderVideoItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.searchBar}>
          <SearchIcon width={32} height={32} />
          <TextInput
            style={styles.input}
            placeholder="Search videos"
            placeholderTextColor="#AAB0C6"
          />
        </View>
        <TouchableOpacity style={styles.settingsIconContainer}>
          <SettingsIcon width={32} height={32} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {renderCategory("React Native", reactNativeVideos, () =>
          console.log("Show more React Native")
        )}
        <View style={styles.divider} />
        {renderCategory("React", reactVideos, () =>
          console.log("Show more React")
        )}
        <View style={styles.divider} />
        {renderCategory("TypeScript", typescriptVideos, () =>
          console.log("Show more TypeScript")
        )}
      </View>

      <View style={styles.navigationPanel}>
        <TouchableOpacity style={styles.navButton}>
          <HomeIcon width={32} height={32} />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <SearchIcon width={32} height={32} />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  rowContainer: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2B2D42",
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    marginLeft: 10,
  },
  settingsIconContainer: {
    marginLeft: 10,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 120,
  },
  category: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B2D42",
  },
  showMoreText: {
    fontSize: 14,
    color: "gray",
    textDecorationLine: "underline",
    fontWeight: "400",
  },
  videoContainer: {
    width: 160,
    marginRight: 16,
    alignItems: "center",
  },
  thumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
  },
  videoInfo: {
    marginTop: 8,
    alignItems: "center",
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 4,
  },
  videoDate: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
  },
  navigationPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 72,
    backgroundColor: "#8D99AE",
    borderTopWidth: 1,
    borderColor: "#8D99AE",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 12,
    color: "#2B2D42",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 10,
  },
});

export default HomeScreen;
