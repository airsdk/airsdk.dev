(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[8608],{29337:(e,t,a)=>{"use strict";a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>c,default:()=>v,frontMatter:()=>d,metadata:()=>u,toc:()=>p});var n=a(87462),l=(a(67294),a(3905)),o=a(73992),i=a(18679),s=a(60788),r=a(24989);const d={title:"macOS install",sidebar_position:1,sidebar_label:"macOS"},c=void 0,u={unversionedId:"basics/install/macos",id:"basics/install/macos",title:"macOS install",description:"System Requirements",source:"@site/docs/basics/install/macos.mdx",sourceDirName:"basics/install",slug:"/basics/install/macos",permalink:"/docs/basics/install/macos",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/basics/install/macos.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"macOS install",sidebar_position:1,sidebar_label:"macOS"},sidebar:"mainSidebar",previous:{title:"Getting Started",permalink:"/docs/basics/getting-started"},next:{title:"Windows",permalink:"/docs/basics/install/windows"}},m={},p=[{value:"System Requirements",id:"system-requirements",level:2},{value:"Install the SDK",id:"install-the-sdk",level:2},{value:"Set your Environment",id:"set-your-environment",level:2},{value:"iOS setup",id:"ios-setup",level:2},{value:"Install Xcode",id:"install-xcode",level:3},{value:"Setup the iOS Simulator",id:"setup-the-ios-simulator",level:3},{value:"Android setup",id:"android-setup",level:2},{value:"Install Android Studio",id:"install-android-studio",level:3},{value:"Set up your Android device",id:"set-up-your-android-device",level:3},{value:"Java",id:"java",level:3}],h={toc:p},k="wrapper";function v(e){let{components:t,...a}=e;return(0,l.kt)(k,(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"system-requirements"},"System Requirements"),(0,l.kt)("p",null,"To install and run AIR your development environment must meet these minimum requirements:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"macOS"),(0,l.kt)("li",{parentName:"ul"},"1.3GB free disk space (for the AIR SDK and does not include other tools)"),(0,l.kt)("li",{parentName:"ul"},"A version of Java 11 JDK")),(0,l.kt)("h2",{id:"install-the-sdk"},"Install the SDK"),(0,l.kt)("p",null,"You have two options to install the AIR SDK. The recommended method is to use the AIR SDK Manager. The manager will inform you of available updates and minimise the download required for each update."),(0,l.kt)("p",null,"Alternatively you can manually download the AIR SDK. "),(0,l.kt)(o.Z,{groupId:"airsdkmanager",defaultValue:"airsdkmanager",values:[{label:"AIR SDK Manager",value:"airsdkmanager"},{label:"Manual",value:"manual"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"airsdkmanager",mdxType:"TabItem"},(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Download the latest release bundle of the AIR SDK Manager:")),(0,l.kt)(r.Z,{platform:"macos",mdxType:"AIRSDKManagerDownload"}),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Start the installer and follow the prompts to install the application.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Once installed, set the ",(0,l.kt)("strong",{parentName:"p"},"AIR SDKs Location")," on your machine. "))),(0,l.kt)("admonition",{title:"AIR SDK Location",type:"note"},(0,l.kt)("p",{parentName:"admonition"},"This location will be where the AIR SDK Manager installs versions of the AIR SDK. This can be an existing directory of AIR SDKs however it is recommended to select a new location, eg ",(0,l.kt)("inlineCode",{parentName:"p"},"/Users/<your-user-name>/sdks/air")),(0,l.kt)("p",{parentName:"admonition"},"The manager will construct a directory for each major version of the AIR SDK (eg ",(0,l.kt)("inlineCode",{parentName:"p"},"AIRSDK_50.2.1"),"), with point releases just be considered as updates. ")),(0,l.kt)("ol",{start:4},(0,l.kt)("li",{parentName:"ol"},"Select one of the available SDK versions and click the gear icon to ",(0,l.kt)("strong",{parentName:"li"},"Install")," the SDK. Once installed you can click ",(0,l.kt)("strong",{parentName:"li"},"Locate")," to locate the installation."))),(0,l.kt)(i.Z,{value:"manual",mdxType:"TabItem"},(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Download the latest release bundle of the AIR SDK:")),(0,l.kt)(s.Z,{platform:"macos",mdxType:"AIRSDKDownload"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"For older versions see the ",(0,l.kt)("a",{parentName:"p",href:"https://airsdk.harman.com/release_notes"},"SDK releases")," page.")),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"Extract the bundle in the desired location, for example:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"cd ~/sdks/air\nunzip ~/Downloads/AIRSDK_MacOS.zip\n")),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"Remove any quarantine that macOS may have applied to the zip by running the following command on the directory you extracted the SDK to:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo xattr -r -d com.apple.quarantine ~/sdks/air\n")))),(0,l.kt)("h2",{id:"set-your-environment"},"Set your Environment"),(0,l.kt)("p",null,"Next you will want to add the AIR SDK tools to your path so you can execute the build commands."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Permanently adding the path will depend on the shell you are using on your machine. Typing ",(0,l.kt)("inlineCode",{parentName:"li"},"echo $SHELL")," in your Terminal will generally tell you which sheel you are using and then you can edit the ",(0,l.kt)("inlineCode",{parentName:"li"},"rc")," file for that shell type, the most common types are:")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"/bin/bash"),": Edit the ",(0,l.kt)("inlineCode",{parentName:"li"},".bash_profile")," or ",(0,l.kt)("inlineCode",{parentName:"li"},".bashrc")," file"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"/bin/zsh"),": Edit the ",(0,l.kt)("inlineCode",{parentName:"li"},".zshrc")," file")),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"Once you have determined the shell type add the following changing the ",(0,l.kt)("inlineCode",{parentName:"li"},"[AIR_SDK_PATH]")," to be the path you installed the AIR SDK to above:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'export AIR_HOME=[AIR_SDK_PATH]\nexport PATH="${PATH}":"${AIR_HOME}/bin"\n')),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Run ",(0,l.kt)("inlineCode",{parentName:"p"},"source ~/.<rc file>")," or start a new Terminal window to refresh the environment.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Verify the AIR SDK ",(0,l.kt)("inlineCode",{parentName:"p"},"bin")," directory is in your path by running:"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"echo $PATH\n")),(0,l.kt)("p",null,"Verify you can access the AIR SDK commands by running:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"which adt adl\n")),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"You can check the version of the AIR SDK by running"),(0,l.kt)("pre",{parentName:"admonition"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"adt -version\n"))),(0,l.kt)("h2",{id:"ios-setup"},"iOS setup"),(0,l.kt)("h3",{id:"install-xcode"},"Install Xcode"),(0,l.kt)("p",null,"While not entirely necessary, downloading Xcode will give you access to the latest developer tools and is highly recommended. This will also give you access to the iOS simulator so you can run your iOS applications in the iOS simulator on your development machine."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Install the latest version of Xcode (using the ",(0,l.kt)("a",{parentName:"p",href:"https://developer.apple.com/xcode/"},"download")," or via the ",(0,l.kt)("a",{parentName:"p",href:"https://itunes.apple.com/us/app/xcode/id497799835"},"Mac App Store"),").")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Ensure you have selected the latest version for the command line tools using:"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer\nsudo xcodebuild -runFirstLaunch\n")),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"Make sure you have accepted the license agreement by opening Xcode once and confirming (or running ",(0,l.kt)("inlineCode",{parentName:"li"},"sudo xcodebuild -license")," from a Terminal).")),(0,l.kt)("h3",{id:"setup-the-ios-simulator"},"Setup the iOS Simulator"),(0,l.kt)("p",null,"Make sure you can launch the iOS simulator by running the following in a Terminal:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"open -a Simulator\n")),(0,l.kt)("h2",{id:"android-setup"},"Android setup"),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"AIR relies on the Android SDK and build tools in order to produce AAB builds and support the latest Android functionality."),(0,l.kt)("p",{parentName:"admonition"},"You can either install the Android SDK directly or we suggest you install Android Studio (which includes the SDK) as this makes the installation process easier and provides additional debugging tools.")),(0,l.kt)("h3",{id:"install-android-studio"},"Install Android Studio"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Download ",(0,l.kt)("a",{parentName:"li",href:"https://developer.android.com/studio"},"Android Studio")),(0,l.kt)("li",{parentName:"ol"},"Start Android studio and run through the setup wizard which will install the latest Android SDK, command line tools and build tools.")),(0,l.kt)("h3",{id:"set-up-your-android-device"},"Set up your Android device"),(0,l.kt)("p",null,"If you have an Android device you intend on debugging with you must make sure you have set up the device for debugging."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},'In order to debug an application on an Android device you need to enable "Developer Mode" and then enable USB debugging. Detailed process is described in the ',(0,l.kt)("a",{parentName:"li",href:"https://developer.android.com/studio/debug/dev-options"},"Android documentation"),"."),(0,l.kt)("li",{parentName:"ol"},"Plug your device into your machine using a cable, and you should receive a prompt on the device to authorise access via the computer;"),(0,l.kt)("li",{parentName:"ol"},"Run the following command and you should see a device listed:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"adt -devices -platform android\n")),(0,l.kt)("h3",{id:"java"},"Java"),(0,l.kt)("p",null,"You must make sure you have version 11 of the Java Development Kit installed and that your ",(0,l.kt)("inlineCode",{parentName:"p"},"JAVA_HOME")," environment variable is set to the JDKs folder."))}v.isMDXComponent=!0},60788:(e,t,a)=>{"use strict";a.d(t,{Z:()=>u});var n=a(67294),l=a(86010),o=a(86683),i=a(83699);const s="acceptButton_X1Hy";class r extends n.Component{acceptButtonClick=()=>{console.log("acceptButtonClick()");const{handleAccept:e}=this.props;e()};render(){return n.createElement("div",null,n.createElement("div",null,"In order to download the AIR SDK you must accept the"," ",n.createElement("a",{href:"https://airsdk.harman.com/assets/pdfs/HARMAN%20AIR%20SDK%20License%20Agreement.pdf"},"license agreement")),n.createElement("div",null,n.createElement("a",{className:(0,l.Z)("button","button--info","button--lg",s),onClick:this.acceptButtonClick},"Accept")))}}const d=r;class c extends n.Component{airAPIURL="https://api.airsdk.harman.com/releases/latest/urls";airDownloadURL="https://airsdk.harman.com";state={loading:!0,airsdkurls:[],acceptedLicense:!1};handleAccept=()=>{sessionStorage.setItem("acceptedLicense","true"),this.setState({acceptedLicense:!0})};componentDidMount(){this.state.acceptedLicense="true"===sessionStorage.getItem("acceptedLicense"),fetch(this.airAPIURL).then((e=>e.json())).then((e=>{this.setState({loading:!1,airsdkurls:e})})).catch(console.log)}downloadURLForPlatform=e=>{var t="AIR_"+(e?"Flex_":"");switch(this.props.platform){case"macos":t+="Mac";break;case"windows":t+="Win";break;case"linux":t+="Linux"}return this.props.platform,this.airDownloadURL+this.state.airsdkurls[t]+"?license="+(this.state.acceptedLicense?"accepted":"denied")};render(){const e=this.state.acceptedLicense;return n.createElement("div",{className:o.Z.content},this.state.loading?n.createElement("div",null,"Loading ..."):n.createElement("div",null,e?n.createElement("div",null,n.createElement(i.Z,{className:(0,l.Z)("button","button--info","button--lg",o.Z.downloadButton),to:this.downloadURLForPlatform(!1)},n.createElement("i",null,n.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",className:o.Z.downloadIcon,viewBox:"0 0 29.978 29.978"},n.createElement("g",null,n.createElement("path",{fill:"currentColor",d:"M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"}),n.createElement("path",{fill:"currentColor",d:"M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"})))),"Download"),n.createElement(i.Z,{className:(0,l.Z)("button","button--primary","button",o.Z.downloadButton),to:this.downloadURLForPlatform(!0)},n.createElement("i",null,n.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",className:o.Z.downloadIcon,viewBox:"0 0 29.978 29.978"},n.createElement("g",null,n.createElement("path",{fill:"currentColor",d:"M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"}),n.createElement("path",{fill:"currentColor",d:"M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"})))),"Download for Flex")):n.createElement(d,{handleAccept:this.handleAccept})))}}const u=c},24989:(e,t,a)=>{"use strict";a.d(t,{Z:()=>d});var n=a(67294),l=a(86010),o=a(86683),i=a(83699),s=a(3529);class r extends n.Component{state={loading:!0,downloadUrl:"",acceptedLicense:!1};componentDidMount(){this.state.acceptedLicense="true"===sessionStorage.getItem("acceptedLicense");new s.vd({}).rest.repos.getLatestRelease({owner:"airsdk",repo:"airsdkmanager-releases"}).then((e=>{if(200!=e.status)return;const{data:{assets:t}}=e,a=this.getExtForPlatform(),[n]=t.filter((e=>e.name.endsWith(a)));this.setState({loading:!1,downloadUrl:n.browser_download_url})})).catch(console.log)}getExtForPlatform=()=>{switch(this.props.platform){case"macos":return"pkg";case"windows":return"msi"}return"___"};render(){return n.createElement("div",{className:o.Z.content},this.state.loading?n.createElement("div",null,"Loading ..."):n.createElement("div",null,n.createElement("div",null,n.createElement(i.Z,{className:(0,l.Z)("button","button--info","button--lg",o.Z.downloadButton),to:this.state.downloadUrl,target:"_blank"},n.createElement("i",null,n.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",className:o.Z.downloadIcon,viewBox:"0 0 29.978 29.978"},n.createElement("g",null,n.createElement("path",{fill:"currentColor",d:"M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"}),n.createElement("path",{fill:"currentColor",d:"M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"})))),"Download"))))}}const d=r},86683:(e,t,a)=>{"use strict";a.d(t,{Z:()=>n});const n={content:"content_gl0L",downloadButton:"downloadButton_wiAm",downloadIcon:"downloadIcon_vCuq"}},5696:()=>{}}]);