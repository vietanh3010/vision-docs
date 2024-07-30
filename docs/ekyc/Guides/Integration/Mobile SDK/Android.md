# Android

## Introduction

This project is developed by FCI Team. This is a project to build a framework that provides the
function of electronic know your customer (eKYC) on four kinds of Vietnam identity documents as
identity card (with and without chip), driving lisence and passport.

App demo: https://play.google.com/store/apps/details?id=com.fci.ekycnew

* [Installation](#installation)
* [Read data from ID card](#read-data-from-id-card)
* [IdentifyCard model](#identifycard-model)

## Installation

1. Copy `ekycsdk.aar` to `app/libs`

2. Implement necessary dependencies

```yaml
    .....
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'com.google.android.material:material:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation "androidx.recyclerview:recyclerview:1.2.1"
    implementation 'androidx.navigation:navigation-fragment:2.5.2'
    implementation 'androidx.navigation:navigation-ui:2.5.2'
    implementation 'androidx.fragment:fragment-ktx:1.x.x'
    def retrofit_version = "2.9.0"
    implementation "com.squareup.retrofit2:retrofit:$retrofit_version"
    implementation "com.squareup.retrofit2:converter-gson:$retrofit_version"
    def camerax_version = "1.1.0"
    implementation "androidx.camera:camera-core:$camerax_version"
    implementation "androidx.camera:camera-camera2:$camerax_version"
    implementation "androidx.camera:camera-lifecycle:$camerax_version"
    implementation "androidx.camera:camera-view:$camerax_version"
    implementation "androidx.camera:camera-video:$camerax_version"
    implementation "androidx.concurrent:concurrent-futures-ktx:1.1.0"
    implementation 'com.squareup.okhttp3:logging-interceptor:4.9.0'

    // OCR
    implementation 'com.google.mlkit:face-detection:16.1.5'
    implementation 'com.google.guava:guava:27.1-android'
    implementation 'com.github.bumptech.glide:glide:4.12.0'
    implementation "com.airbnb.android:lottie:3.4.0"
    
    // if use NFC
    implementation 'org.jmrtd:jmrtd:0.7.34'
    implementation 'com.madgag.spongycastle:prov:1.58.0.0'
    implementation 'net.sf.scuba:scuba-sc-android:0.0.23'
    implementation 'edu.ucar:jj2000:5.2'
    implementation 'com.github.mhshams:jnbis:2.1.2'
    implementation 'com.google.android.gms:play-services-mlkit-text-recognition:19.0.0'
    //
    
```

3. Permission
```yaml
    <uses-feature android:name="android.hardware.camera.any" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"  android:maxSdkVersion="28" />
    <uses-permission android:name="android.permission.NFC" />
```

## Read data from ID card

1. Setup `ActivityResultLauncher` from `Activity` or `Fragment` to receive result intent

```kotlin
    private val startSDK = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            // todo: get data from intent
        }
    }
```

2. Get `data` from intent

```kotlin
    private val startSDK = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            result.data?.apply {
                //Image, video link
                getStringExtra(BaseConfig.ReturnParamType.FRONT_FILE_PATH.name)
                getStringExtra(BaseConfig.ReturnParamType.BACK_FILE_PATH.name)
                getStringExtra(BaseConfig.ReturnParamType.VIDEO_FILE_PATH.name)
                //data result
                println("liveData live ${EkycResult.liveData?.message}")
                println("ocrData ocr ${EkycResult.ocrData?.data?.get(1)?.value}")
                println("nfcData ocr ${EkycResult.nfcData?.name}")
                // if you want to switch json data type
                Gson().toJson(EkycResult.ocrData)
            }
        }
    }
```

3. Start `EkycSDKActivity`
   - API_KEY: key from EKYC.
   - CASE: 1,2,3,4,5 (default = 1)
            + case = 1: if dont use NFC
            + case = 2,3: use NFC without verify C06
            + case = 4,5: use NFC with verify C06
   - LIVENESS_TYPE: photo, video.
   - SHOW_RESULT(default: true): the details of the identity card will be displayed if the process of reading and retrieving information from the card is successful.
   - LIMIT (default = 5): Number of times user is allowed to record video, too many times will get out of sdk
   - COUNTRY (default = "vi"): Codes for the Representation of Names of Languages(ISO 639-1)
   - NOT_SHOW: Hide document(IDENTITY_CARD, DRIVER_LICENSE, PASSPORT)
```kotlin
    Intent(this@MainActivity, EkycSDKActivity::class.java).apply {
        putExtra(BaseConfig.ParamType.API_KEY.name, "")//Api key from EKYC
        putExtra(BaseConfig.ParamType.UUID.name, "uuid")//UUID.randomUUID()
        //optional
        putExtra(BaseConfig.ParamType.ENVIRONMENT.name, BaseConfig.EnvironmentType.DEV.ordinal) (default is PROD)
        putExtra(BaseConfig.ParamType.COUNTRY.name, "vi")
        putExtra(BaseConfig.ParamType.NOT_SHOW.name, BaseConfig.DocumentType.DRIVER_LICENSE.ordinal)
    
        startSDK.launch(this)
    }
```
- User can open screen capture without document select screen by:
    + Change EkycSDKActivity to EkycActivity
    + putExtra(BaseConfig.ParamType.DOCUMENT_TYPE.name, BaseConfig.DocumentType.IDENTITY_CARD.ordinal)

- Because data is too heavy to put in Parcelable, we have to store it in a singleton class
  called `EkycResult`

```kotlin
    val ocr = EkycResult.ocrData
    val nfc = EkycResult.nfcData
    val live = EkycResult.liveData
```

4. Start NFC only

```kotlin
    Intent(this@MainActivity, EkycActivity::class.java).apply {
        putExtra(BaseConfig.ParamType.API_KEY.name, "")
        putExtra(BaseConfig.ParamType.NFC_ONLY.name, true)
    
        // optional
        putExtra(Constant.CARD_NUMBER, "042099000591")
        putExtra(Constant.CARD_DOB, "20/10/2000")
        putExtra(Constant.CARD_EXPIRYDATE, "20/10/2024")
        putExtra(BaseConfig.ParamType.SHOW_RESULT.name, true)
        startSDK.launch(this)
    }
```

## IdentifyCard model

```kotlin

@Parcelize
data class IdentifyCard(
    val faceImage: Bitmap? = null,
    val number: String? = null,
    val name: String? = null,
    val dob: String? = null,
    val sex: String? = null,
    val nationality: String? = null,
    val religion: String? = null,
    val placeOfOrigin: String? = null,
    val placeOfResidence: String? = null,
    val issueDate: String? = null,
    val expiryDate: String? = null,
    val prevNumber: String? = null,
    val personalIdentification: String? = null,
    val fatherName: String? = null,
    val motherName: String? = null,
    val partnerName: String? = null,
    val rawData: RawData
) : Parcelable


@Parcelize
data class RawData(
    val com: String,
    val sod: String,
    val dg1: String,
    val dg2: String,
    val dg13: String
) : Parcelable

```

4. Customize layout (open .aar file in Android Studio)
- User can customize layout by override a layout into sdk res folder, keep file name, action id.
- User can edit text, color by override a key (string,color) into sdk values folder 

5. You also need to add the following Proguard rules to your proguard-rules.pro file:

```yaml
    -keep class com.fpt.fci.ekycfull.domain.** { *; }
    -keep class com.fpt.fci.ekycfull.presentation.view.** { *; }
    -keep class com.fpt.fci.ekycfull.EkycResult { *; }
    -keep class com.fpt.fci.ekycfull.utils.Constant { *; }
    -keep class com.squareup.** { *; }
    -allowaccessmodification
    -useuniqueclassmembernames
    -keeppackagenames com.fpt.fci.ekycfull**
    -keep class org.jmrtd.** { *; }
    -keep class net.sf.scuba.** {*;}
    -keep class org.bouncycastle.** {*;}
    -keep class org.spongycastle.** {*;}
    -keep class edu.ucar.** {*;}
    -dontwarn edu.ucar.**
    -dontwarn org.bouncycastle.**
    -dontwarn org.spongycastle.**
    
    -dontwarn org.jmrtd.**
    -dontwarn net.sf.scuba.**
```

## Contact

[FPT.AI](https://fpt.ai/) - support@fpt.ai

FPT Tower, 10 Pham Van Bach street, Cau Giay District, Hanoi, Vietnam

1900 638 399

Project Link: [https://github.com/](https://github.com/)
