// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Image,
//   Alert,
//   TouchableOpacity,
//   Pressable,
// } from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import Video from 'react-native-video';
// import {useNavigation} from '@react-navigation/native';

// const Posts = () => {
//   const [mediaList, setMediaList] = useState([]); 
//   const [selectedMedia, setSelectedMedia] = useState(null); 
//   const navigation = useNavigation();


//   const openGallery = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'mixed',
//         quality: 0.5,
//         selectionLimit: 0,
//       },
//       response => handleMediaResponse(response),
//     );
//   };

//   const handleMediaResponse = response => {
//     if (response.didCancel) {
//       Alert.alert('User cancelled image picker');
//     } else if (response.errorCode) {
//       Alert.alert('Error:', response.errorMessage);
//     } else if (response.assets && response.assets.length > 0) {
//       const newMedia = response.assets.map(asset => ({
//         uri: asset.uri,
//         type: asset.type.includes('image') ? 'image' : 'video',
//       }));
//       setMediaList([...mediaList, ...newMedia]);
//     }
//   };


//   const handleMediaSelect = item => {
//     setSelectedMedia(item);
//   };


//   const handleMediaRemove = uri => {
//     setMediaList(mediaList.filter(item => item.uri !== uri)); 
//     if (selectedMedia && selectedMedia.uri === uri) {
//       setSelectedMedia(null); 
//     }
//   };

//   return (
//     <View style={styles.container}>

//       {selectedMedia ? (
//         selectedMedia.type === 'image' ? (
//           <Image source={{uri: selectedMedia.uri}} style={styles.media} />
//         ) : (
//           <Video
//             source={{uri: selectedMedia.uri}}
//             style={styles.media}
//             controls={true}
//             resizeMode="contain"
//             paused={false}
//           />
//         )
//       ) : (
//         <Text style={styles.placeholder}>Select a media to preview</Text>
//       )}

//       <FlatList
//         data={mediaList}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={3}
//         style={styles.gallery}
//         renderItem={({item}) => (
//           <View style={styles.mediaContainer}>
//             <TouchableOpacity onPress={() => handleMediaSelect(item)}>
//               {item.type === 'image' ? (
//                 <Image
//                   source={{uri: item.uri}}
//                   style={styles.thumbnail}
//                   resizeMode="cover"
//                 />
//               ) : (
//                 <View style={styles.videoThumbnail}>
//                   <Video
//                     source={{uri: item.uri}}
//                     style={styles.videoThumbnail}
//                     resizeMode="cover"
//                     paused={true}
//                   />
//                 </View>
//               )}
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.removeButton}
//               onPress={() => handleMediaRemove(item.uri)}>
//               <Text style={styles.removeButtonText}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         ListEmptyComponent={
//           <Text style={styles.placeholder}>No media available</Text>
//         }
//       />

//       {/* Buttons */}
//       <View style={styles.buttonContainer}>
//         <Pressable style={styles.addButton} onPress={openGallery}>
//           <Text style={styles.buttonText}>Add Media</Text>
//         </Pressable>
//         <Pressable
//           style={styles.postButton}
//           onPress={() => navigation.navigate('AddPost')}>
//           <Text style={styles.buttonText}>Post</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default Posts;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   media: {
//     width: '100%',
//     height: 300,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   placeholder: {
//     fontSize: 18,
//     color: '#777',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   gallery: {
//     flex: 1,
//   },
//   mediaContainer: {
//     position: 'relative',
//     margin: 5,
//   },
//   thumbnail: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   videoThumbnail: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   removeButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: 'rgba(255, 0, 0, 0.8)',
//     padding: 5,
//     borderRadius: 8,
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   postButton: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 8,
//     flex: 1,
//     marginLeft: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });




import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const Posts = () => {
  const [mediaList, setMediaList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [postCaption, setPostCaption] = useState(''); // State for post caption
  const navigation = useNavigation();

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        quality: 0.5,
        selectionLimit: 0,
      },
      response => handleMediaResponse(response),
    );
  };

  const handleMediaResponse = response => {
    if (response.didCancel) {
      Alert.alert('User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const newMedia = response.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type.includes('image') ? 'image' : 'video',
      }));
      setMediaList([...mediaList, ...newMedia]);
      if (!selectedMedia) {
        setSelectedMedia(newMedia[0]); // Automatically set the first selected media as the main view.
      }
    }
  };

  const handleMediaSelect = item => {
    setSelectedMedia(item);
  };

  const handleMediaRemove = uri => {
    const updatedMediaList = mediaList.filter(item => item.uri !== uri);
    setMediaList(updatedMediaList);
    if (selectedMedia && selectedMedia.uri === uri) {
      setSelectedMedia(
        updatedMediaList.length > 0 ? updatedMediaList[0] : null,
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Media Preview Box */}
      <View style={styles.previewBox}>
        {selectedMedia ? (
          selectedMedia.type === 'image' ? (
            <Image
              source={{uri: selectedMedia.uri}}
              style={styles.mainMediaContent}
            />
          ) : (
            <Video
              source={{uri: selectedMedia.uri}}
              style={styles.mainMediaContent}
              controls={true}
              resizeMode="contain"
              paused={false}
            />
          )
        ) : (
          <Pressable style={styles.addMediaCenter} onPress={openGallery}>
            <Text style={styles.addMediaText}>Add Media</Text>
          </Pressable>
        )}
      </View>

      {/* Thumbnails Section */}
      <View style={styles.thumbnailSection}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalThumbnails}>
          {mediaList.map((item, index) => (
            <View key={index} style={styles.thumbnailContainer}>
              <TouchableOpacity onPress={() => handleMediaSelect(item)}>
                {item.type === 'image' ? (
                  <Image source={{uri: item.uri}} style={styles.thumbnail} />
                ) : (
                  <Video
                    source={{uri: item.uri}}
                    style={styles.thumbnail}
                    resizeMode="cover"
                    paused={true}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleMediaRemove(item.uri)}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Caption Input */}
      <TextInput
        style={styles.captionInput}
        placeholder="Add a caption for the post..."
        value={postCaption}
        onChangeText={setPostCaption}
      />

      {/* Post Button */}
      <Pressable
        style={styles.postButton}
        onPress={() => {
          Alert.alert('Post Caption', postCaption || 'No caption provided.');
          navigation.navigate('AddPost');
        }}>
        <Text style={styles.postButtonText}>Post</Text>
      </Pressable>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  previewBox: {
    height: 400,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  addMediaCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMediaText: {
    fontSize: 18,
    color: '#777',
  },
  mainMediaContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  thumbnailSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  horizontalThumbnails: {
    flexDirection: 'row',
    // marginTop: 10,
  },
  thumbnailContainer: {
    position: 'relative',
    margin: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 5,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  captionInput: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 20,
    width: '100%',
    height:"300px",
    // height:"100%"
    backgroundColor:"red"
  },
  postButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
