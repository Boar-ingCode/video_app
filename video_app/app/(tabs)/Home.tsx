import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import SearchIcon from "../../assets/icons/search-icon.svg";
import HomeIcon from "../../assets/icons/home-icon.svg";
import SettingsIcon from "../../assets/icons/settings-icon.svg";

const API_KEY = "AIzaSyBeNcN5uuIUx5_TXsFqFFMlPqv8f7LFQwk";


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); 
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reactNativeVideos, setReactNativeVideos] = useState<any[]>([]);
  const [reactVideos, setReactVideos] = useState<any[]>([]);
  const [typescriptVideos, setTypescriptVideos] = useState<any[]>([]);
  
  type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
  >;

  useEffect(() => {
    const fetchCategoryVideos = async (
      query: string,
      setState: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${query}&type=video&part=snippet&maxResults=2`
        );
        const data = await res.json();

        if (!data.items || data.items.length === 0) {
          console.warn(`No videos found for category query: ${query}`);
          setState([]);
          return;
        }

        const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
        const detailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics`
        );
        const detailsData = await detailsRes.json();

        setState(detailsData.items || []);
      } catch (error) {
        console.error(`Error fetching ${query} videos:`, error);
      }
    };

    const fetchAllCategories = async () => {
      setLoading(true);
      await Promise.all([
        fetchCategoryVideos("react+native+tutorial", setReactNativeVideos),
        fetchCategoryVideos("react+tutorial", setReactVideos),
        fetchCategoryVideos("typescript+tutorial", setTypescriptVideos),
      ]);
      setLoading(false);
    };

    fetchAllCategories();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; 
    setLoading(true);

    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}&type=video&part=snippet&maxResults=10`
      );
      const searchData = await searchResponse.json();

      if (!searchData.items || searchData.items.length === 0) {
        console.warn(`No videos found for: ${searchQuery}`);
        setSearchResults([]);
        setLoading(false);
        return;
      }

      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics`
      );
      const detailsData = await detailsResponse.json();

      setSearchResults(detailsData.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderVideoItem = ({ item }: { item: any }) => {
    const publicationDate = new Date(item.snippet.publishedAt).toLocaleDateString();

    return (
      <View style={styles.videoContainer}>
        <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.snippet.title}
        </Text>
        <Text style={styles.videoDate}>{publicationDate}</Text>
      </View>
    );
  };

  const renderSearchItem = ({ item }: { item: any }) => {
    const publicationDate = new Date(item.snippet.publishedAt).toLocaleDateString();
  
    return (
      <View style={styles.searchItemContainer}>
        <Image 
          source={{ uri: item.snippet.thumbnails.medium.url }} 
          style={styles.searchThumbnail} 
        />
        <Text style={styles.searchTitle} numberOfLines={2}>
          {item.snippet.title}
        </Text>
        <Text style={styles.searchDate}>{publicationDate}</Text>
      </View>
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

  const renderMainContent = () => {
    if (searchQuery.trim().length > 0) {
      return (
        <View style={styles.searchResultsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#2B2D42" />
          ) : (
            <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={renderSearchItem}   
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
            showsHorizontalScrollIndicator={false}
          />
          )}
        </View>
      );
    }

    return (
      <View style={styles.categoriesContainer}>
        {renderCategory("React Native", reactNativeVideos, () =>
          console.log("Show more React Native")
        )}
        <View style={styles.divider} />
        {renderCategory("React", reactVideos, () => console.log("Show more React"))}
        <View style={styles.divider} />
        {renderCategory("TypeScript", typescriptVideos, () =>
          console.log("Show more TypeScript")
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search videos"
            placeholderTextColor="#AAB0C6"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} 
          />
        </View>
        <TouchableOpacity style={styles.settingsIconContainer} onPress={() => navigation.navigate("Settings")}>
          <SettingsIcon width={32} height={32} />
        </TouchableOpacity>
      </View>

      {/* Main area: either categories or search results */}
      <View style={styles.mainContent}>{renderMainContent()}</View>

      {/* Bottom nav */}
      <View style={styles.navigationPanel}>
        <TouchableOpacity style={styles.navButton}>
          <HomeIcon width={32} height={32} stroke={isSearchFocused ? "#FFF" : "#2B2D42"} />
          <Text style={[styles.navButtonText, { color: isSearchFocused ? "#FFF" : "#2B2D42" }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <SearchIcon width={32} height={32} fill={isSearchFocused ? "#2B2D42" : "#FFF"} />
          <Text style={[styles.navButtonText, { color: isSearchFocused ? "#2B2D42" : "#FFF" }]}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

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
  mainContent: {
    flex: 1,
    marginTop: 120,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchResultsContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 80, 
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
  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 10,
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
  videoTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  videoDate: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
    textAlign:"right"
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
    marginTop: 5,
  },
  searchItemContainer: {
    width: "90%",          
    alignSelf: "center",   
    marginBottom: 20,      
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,           
    shadowColor: "#000",   
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,          
  },
  searchThumbnail: {
    width: "100%",
    height: 200,           
    borderRadius: 8,
    marginBottom: 8,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  searchDate: {
    fontSize: 14,
    color: "#777",
  },
});
