import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

    profileImage: any;
    profileImageUrl = 'url(../../assets/imgs/profile_blank.png)';
    progress = 0;

    private userImageRef: any;

    constructor(private camera: Camera, private userService: UserService) {

        this.userImageRef = firebase.storage().ref().child(`userprofile/${this.userService.activeUser.uid}.jpg`);
    }

    ionViewWillEnter() {

        if (this.userService.activeUser.profileImgUrl) {
            this.profileImageUrl = `url(${this.userService.activeUser.profileImgUrl})`;
        }

        // Get the download URL
        // this.userImageRef.getDownloadURL().then(function (url) {
        //     // Insert url into an <img> tag to "download"
        // }).catch(function (error) {

        //     // A full list of error codes is available at
        //     // https://firebase.google.com/docs/storage/web/handle-errors
        //     switch (error.code) {
        //         case 'storage/object_not_found':
        //             // File doesn't exist
        //             break;

        //         case 'storage/unauthorized':
        //             // User doesn't have permission to access the object
        //             break;

        //         case 'storage/canceled':
        //             // User canceled the upload
        //             break;

        //         case 'storage/unknown':
        //             // Unknown error occurred, inspect the server response
        //             break;
        //     }
        // });
    }

    editPhoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 720,
            correctOrientation: true
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.profileImage = 'data:image/jpeg;base64,' + imageData;
            this.upload();
        }, (err) => {
            // Handle error
        });
    }

    upload() {

        // Create the file metadata
        // var metadata = {
        //     contentType: 'image/jpeg'
        // };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = this.userImageRef.putString(this.profileImage, 'data_url');

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + this.progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                const imgUrl = uploadTask.snapshot.downloadURL;
                this.profileImageUrl = `url(${imgUrl})`;
                this.userService.postProfileImageUrl(imgUrl).subscribe();
            });
    }
}
