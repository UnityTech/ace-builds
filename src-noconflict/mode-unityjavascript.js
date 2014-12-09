ace.define("ace/mode/unityjavascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var unityjavascriptHighlightRules = function() {

    this.$rules = { start: 
       [ { include: 'source.js' },
         { token: 'support.class.js.unity',
           regex: '\\b(?: |AddComponentMenu|Animation|AnimationClip|AnimationCurve|AnimationEvent|AnimationState|Application|Array|AssetBundle|AudioClip|AudioListener|AudioSource|Behaviour|BitStream|BoneWeight|Bounds|BoxCollider|Camera|CapsuleCollider|CharacterController|CharacterJoint|Collider|Collision|Color|Component|ConfigurableJoint|ConstantForce|ContactPoint|ContextMenu|ControllerColliderHit|Coroutine|Cubemap|Debug|Event|ExecuteInEditMode|FixedJoint|Flare|Font|GameObject|GeometryUtility|Gizmos|GL|Graphics|GUI|GUIContent|GUIElement|GUILayer|GUILayout|GUILayoutOption|GUILayoutUtility|GUISettings|GUISkin|GUIStyle|GUIStyleState|GUIText|GUITexture|GUIUtility|Hashtable|HideInInspector|HingeJoint|HostData|Input|Joint|JointDrive|JointLimits|JointMotor|JointSpring|Keyframe|LayerMask|LensFlare|Light|LightmapData|LightmapSettings|LineRenderer|MasterServer|Material|MaterialPropertyBlock|Mathf|Matrix4x4|Mesh|MeshCollider|MeshFilter|MeshRenderer|MonoBehaviour|MovieTexture|Network|NetworkMessageInfo|NetworkPlayer|NetworkView|NetworkViewID|NonSerialized|Object|Particle|ParticleAnimator|ParticleEmitter|ParticleRenderer|Path|PhysicMaterial|Physics|Ping|Plane|PlayerPrefs|PlayerPrefsException|Projector|QualitySettings|Quaternion|Random|Ray|RaycastCollider|RaycastHit|Rect|RectOffset|RenderBeforeQueues|Renderer|RenderSettings|RenderTexture|RequireComponent|Resolution|Resources|Rigidbody|RPC|Screen|ScriptableObject|Serializable|Shader|SkinnedMeshRenderer|Skybox|SoftJointLimit|SphereCollider|SpringJoint|String|SystemInfo|Terrain|TerrainCollider|TerrainData|TextAsset|TextMesh|Texture|Texture2D|Time|TrailRenderer|Transform|Vector2|Vector3|Vector4|WaitForEndOfFrame|WaitForFixedUpdate|WaitForSeconds|WheelCollider|WheelFrictionCurve|WheelHit|WWW|WWWForm|YieldInstruction|Ani|iPhone|iPhoneAccelerationEvent|iPhoneInput|iPhoneOrientation|iPhoneSettings|iPhoneTouch|iPhoneTouchPhase|SpriteManager|LinkedSpriteManager|Sprite| )\\b' },
         { token: 'support.function.js.unity',
           regex: '\\b(?: |a|Abs|absoluteURL|AcceptDrag|Acos|active|activeControlID|activeGameObject|activeObject|activeTerrain|activeTransform|Add|AddBinaryData|AddClip|addCollider|AddColor|AddComponent|AddComponentMenu|AddEvent|AddExplosionForce|AddField|AddFloat|AddForce|AddForceAtPosition|AddKey|AddMatrix|AddMixingTransform|AddObjectToAsset|AddRelativeForce|AddRelativeTorque|AddTorque|AddVector|alignment|allCameras|AllocateViewID|alt|ambientLight|anchor|Angle|angle|AngleAxis|angularDrag|angularVelocity|angularXDrive|angularXMotion|angularYLimit|angularYMotion|angularYZDrive|angularZLimit|angularZMotion|animatePhysics|animation|AnimationClip|AnimationCurve|AnimationEvent|animationState|anisoLevel|anyKey|anyKeyDown|applicationContentsPath|Apply|Approximately|Asin|aspect|aspectRatio|assetBundle|assetImporter|assetPath|AssetPathToGUID|asymptoteSlip|asymptoteValue|Atan|Atan2|attachedRigidbody|attenuate|audio|audioClip|autodestruct|autoRepaintOnSceneChange|axis|b|background|backgroundColor|bakeIK|barycentricCoordinate|basemapDistance|Begin|BeginArea|BeginGroup|BeginHorizontal|BeginScrollView|BeginVertical|bindposes|black|Blend|blendMode|blue|boneIndex0|boneIndex1|boneIndex2|boneIndex3|bones|boneWeights|border|borderMipmap|bottom|bounceCombine|bounceThreshold|bouncyness|Bounds|bounds|Box|box|brakeTorque|Break|breakForce|breakTorque|brightness|BringWindowToBack|BringWindowToFront|BroadcastMessage|BuildAssetBundle|BuildPlayer|Button|button|bytes|CalcHeight|CalcMinMaxWidth|CalcScreenSize|CalcSize|CalculateFrustumPlanes|camera|cameraToWorldMatrix|cameraVelocityScale|CancelQuit|CanStreamedLevelBeLoaded|capsLock|captureFramerate|CaptureScreenshot|castShadows|Ceil|CeilToInt|center|centerOfMass|changed|channels|character|CheckCapsule|CheckSphere|childCount|Clamp|Clamp01|Clear|clear|ClearCurves|clearFlags|ClearHostList|ClearParticles|ClearProgressBar|ClearUndo|clickCount|clip|clipAnimations|clipping|CloneComponent|Close|CloseConnection|ClosestPointOnBounds|ClosestPowerOfTwo|CollectDependencies|collider|collisionFlags|Color|color|colorAnimation|colors|Combine|command|comment|CompareTag|compressionBitrate|Concat|configuredInWorldSpace|Connect|connectedBody|connectedPlayers|connections|connectionTesterIP|connectionTesterPort|constantForce|contacts|Contains|contentColor|contentOffset|context|ContextMenu|control|controller|convertToNormalmap|convex|cookie|CopyAsset|CopyFileOrDirectory|CopyFileOrDirectoryFollowSymlinks|CopyFrom|CopyPropertiesFromMaterial|CopySerialized|correctGamma|Cos|Create|CreateAsset|CreateEmptyPrefab|CreateInstance|CreatePrimitive|CreateTerrainGameObject|Cross|CrossFade|CrossFadeQueued|Cubemap|cullingMask|current|currentLevel|currentResolution|currentScene|cursorColor|cursorFlashSpeed|curve|customStyles|cyan|damper|damping|data|dataPath|decompressOnLoad|DecreaseLevel|dedicatedServer|Deg2Rad|DeleteAll|DeleteAsset|DeleteFileOrDirectory|DeleteKey|delta|deltaTime|depth|Destroy|DestroyImmediate|DestroyPlayerObjects|DetachChildren|detailObjectDistance|detectCollisions|direction|Disconnect|DisplayDialog|DisplayDialogComplex|DisplayProgressBar|DisplayWizard|Dispose|Distance|distance|doesAnimateColor|DontDestroyOnLoad|Dot|doubleClickSelectsWord|drag|DragWindow|Draw|DrawCube|DrawGizmo|DrawGUITexture|DrawIcon|DrawLine|DrawMesh|DrawMeshNow|DrawRay|DrawSphere|DrawTexture|DrawWireCube|DrawWireSphere|DrawWithTextSelection|dynamicFriction|dynamicFriction2|EaseInOut|EditorWindow|Emit|emit|emitterVelocityScale|enabled|Encapsulate|EncodeToPNG|End|EndArea|EndGroup|EndHorizontal|EndScrollView|EndVertical|endWidth|energy|Epsilon|error|errorString|EscapeURL|Euler|eulerAngles|Evaluate|ExitGUI|Exp|Expand|ExpandHeight|ExpandWidth|extents|ExternalCall|ExternalEval|externalIP|externalPort|ExtractOggFile|extremumSlip|extremumValue|fadeout|farClipPlane|fieldOfView|filterMode|Find|FindAsset|FindGameObjectsWithTag|FindObjectOfType|FindObjectsOfType|FindStyle|FindTexture|FindWithTag|firstFrame|fixedDeltaTime|fixedHeight|fixedTime|fixedWidth|flare|flareStrength|FlexibleSpace|FloatField|Floor|FloorToInt|FocusControl|focused|FocusWindow|fog|fogColor|fogDensity|font|force|format|FormatBytes|forward|forwardDir|forwardFriction|forwardSlip|frameCount|frameRate|freeSpin|freezeRotation|frictionCombine|frictionDirection2|FromToRotation|fullScreen|functionKey|functionName|g|gameName|GameObject|gameObject|gameObjects|gameType|generateAnimations|generateCubemap|generateMaterials|GenerateUniqueAssetPath|GetAllCurves|GetAnimatableProperties|GetAnimationEvents|GetAspectRect|GetAssetPath|GetAtPath|GetAveragePing|GetAxis|GetAxisRaw|GetBool|GetButton|GetButtonDown|GetButtonUp|GetCachedIcon|GetClass|GetClipCount|GetColor|GetColumn|GetComponent|GetComponentInChildren|GetComponents|GetComponentsInChildren|GetControlID|GetCursorPixelPosition|GetCursorStringIndex|GetDirectoryName|GetDistanceToPoint|GetDragAndDropTitle|GetEditorAssetBundle|GetEditorCurve|GetExtension|GetFileName|GetFileNameWithoutExtension|GetFiltered|GetFloat|GetFloatValue|GetGenericData|GetGroundHit|GetHeights|GetInstanceID|GetInt|GetInterpolatedNormal|GetKey|GetKeyDown|GetKeyUp|GetLastPing|GetMatrix|GetMouseButton|GetMouseButtonDown|GetMouseButtonUp|GetObjectEnabled|GetPixel|GetPixelBilinear|GetPixels|GetPoint|GetPointVelocity|GetPostprocessOrder|GetPropertyEditorTitle|GetRect|GetRelativePointVelocity|GetRow|GetScreenRect|GetSide|GetStateObject|GetStreamProgressForLevel|GetString|GetStyle|GetTag|GetTemporary|GetTexture|GetTextureOffset|GetTextureScale|GetTransforms|GetTriangles|GetTypeForControl|GetVector|globalScale|graphicsDeviceName|graphicsDeviceVendor|graphicsDeviceVersion|graphicsMemorySize|gravity|gray|grayscale|grayscaleToAlpha|green|grey|group|GUIContent|GUIDToAssetPath|GUIStyle|guiText|guiTexture|GUIToScreenPoint|haloStrength|HasCharacter|HasHelpForObject|HasKey|HasNamedHelp|HasProperty|hasTitle|HavePublicAddress|headers|Height|height|heightmapHeight|heightmapMaximumLOD|heightmapPixelError|heightmapScale|heightmapWidth|helpString|hideFlags|highAngularXLimit|highTwistLimit|hingeJoint|HitTest|horizontal|HorizontalScrollbar|horizontalScrollbar|horizontalScrollbarLeftButton|horizontalScrollbarRightButton|horizontalScrollbarThumb|HorizontalSlider|horizontalSlider|horizontalSliderThumb|hotControl|hover|IconContent|identity|IgnoreCollision|ignoreLayers|ignoreListenerVolume|image|imagePosition|ImportAsset|incomingPassword|IncreaseLevel|inertiaTensor|inertiaTensorRotation|Infinity|InitializeSecurity|InitializeServer|inputString|insideUnitCircle|insideUnitSphere|Instantiate|InstantiatePrefab|inTangent|intensity|interpolation|IntersectRay|IntField|Inverse|inverse|InverseLerp|InverseTransformDirection|InverseTransformPoint|ip|ipAddress|IsChildOf|isClient|IsCreated|isCubemap|isDebugBuild|isDone|isEditor|isGrounded|isIdentity|isKey|isKinematic|isLoadingLevel|isMessageQueueRunning|isMine|isMouse|IsPlaying|isPlaying|isPowerOfTwo|isReading|isReadyToPlay|isServer|IsSleeping|isSupported|isTrigger|isValid|isWriting|Join|keyboardControl|KeyboardEvent|keyCode|Keyframe|keys|Label|label|lastFrame|layer|LayerToName|left|length|lengthScale|Lerp|LerpAngle|levelCount|light|lighting|lightmap|lightmapIndex|lightmaps|lightmapTilingOffset|limit|limits|Linear|linearLimit|Linecast|lineHeight|LINES|lineSpacing|Load|LoadAll|LoadAssetAtPath|loadedLevel|loadedLevelName|LoadIdentity|LoadImage|LoadImageIntoTexture|LoadLevel|LoadLevelAdditive|LoadMainAssetAtPath|LoadOrtho|LoadPixelMatrix|LoadProjectionMatrix|LoadUnityWeb|localEulerAngles|localPosition|localRotation|localRotationAxis|localScale|localToWorldMatrix|localVelocity|lockCursor|Log|Log10|LogError|LogWarning|LookAt|LookRotation|loop|lossyScale|lowAngularXLimit|lowTwistLimit|magenta|magnitude|main|mainAsset|mainTexture|mainTextureOffset|mainTextureScale|MakeSnapshot|MangleVariableName|margin|mass|Material|material|materials|matrix|Max|max|maxAngularVelocity|maxBounce|maxConnections|maxDistance|maxEmission|maxEnergy|MaxHeight|maximumForce|maxParticleSize|maxSize|maxTextureSize|maxVolume|MaxWidth|MenuCommand|MenuItem|Mesh|mesh|messageOptions|Min|min|minBounce|minDistance|minEmission|minEnergy|MinHeight|minimumAllocatableViewIDs|MinMaxRect|minPenetrationForPenalty|minSize|minVolume|MinWidth|mipMapBias|mipmapCount|mipmapEnabled|mipmapFadeDistanceEnd|mipmapFadeDistanceStart|mipmapFilter|mode|modelview|motor|motorTorque|mousePosition|Move|MoveAsset|MoveAssetToTrash|moveDirection|MoveFileOrDirectory|MoveKey|moveLength|MovePosition|MoveRotation|movie|MultiplyPoint|MultiplyPoint3x4|MultiplyVector|MultiTexCoord|MultiTexCoord2|MultiTexCoord3|MultMatrix|name|NameToLayer|natFacilitatorIP|natFacilitatorPort|nearClipPlane|NegativeInfinity|NetworkPlayer|networkView|NewScene|none|normal|Normalize|normalized|normalizedSpeed|normalizedTime|normalmapFilter|normals|normalSmoothingAngle|npotScale|numeric|ObjectContent|ObjectField|objectReferences|objects|observed|oggVorbis|onActive|one|onFocused|onHover|onNormal|onUnitSphere|OpenAsset|OpenFilePanel|OpenScene|OpenSceneAdditive|OpenURL|Optimize|origin|Ortho|orthographic|orthographicSize|OrthoNormalize|otherCollider|outTangent|overflow|OverlapSphere|owner|PackTextures|padding|parent|particleCount|particleEmitter|particleRenderMode|particles|passCount|passwordProtected|path|paths|Pause|pause|peerType|PerformRedo|PerformUndo|Perspective|PhysicMaterial|PI|Ping|PingPong|pitch|pixelHeight|pixelInset|pixelLightCount|pixelOffset|pixelRect|pixelWidth|Plane|platform|Play|playAutomatically|PlayClipAtPoint|player|playerLimit|playOnAwake|PlayOneShot|PlayQueued|point|PollHostList|Pop|PopAssetDependencies|PopMatrix|Popup|port|position|positionDamper|positionSpring|postWrapMode|Pow|PrepareStartDrag|preview|preWrapMode|progress|Project|projectionAngle|projectionDistance|projectionMatrix|projectionMode|propertyName|PropertyToID|proxyIP|proxyPassword|proxyPort|Push|PushAssetDependencies|PushMatrix|QUADS|quality|Quaternion|QueryStateObject|Quit|r|Rad2Deg|radius|Range|range|Ray|Raycast|RaycastAll|ReadPixels|realtimeSinceStartup|RecalculateBounds|RecalculateNormals|recalculateNormals|receiveShadows|recommendedTextureFormat|Rect|rect|RectField|red|reduceKeyframes|Reflect|Refresh|refreshRate|RegisterHost|RegisterSceneUndo|RegisterUndo|relativeForce|relativeTorque|relativeVelocity|Release|ReleaseTemporary|Remove|RemoveAt|RemoveClip|RemoveKey|RemoveRPCs|RemoveRPCsInGroup|Render|RenderBeforeQueues|renderer|renderMode|RenderTexture|RenderToCubemap|RenderWithShader|Repaint|Repeat|RepeatButton|ReplacePrefab|RequestHostList|RequireComponent|ResetAspect|ResetInputAxes|ResetProjectionMatrix|ResetReplacementShader|ResetWorldToCameraMatrix|Resize|resolutions|RestoreSnapshot|Reverse|Rewind|right|rigidbody|rndForce|rndVelocity|rolloffFactor|root|Rotate|RotateAround|RotateAroundPivot|RotateTowards|rotation|rotationDriveMode|Round|RoundToInt|RPC|rpm|runInBackground|SameSide|Sample|SampleAnimation|SampleHeight|SaveAssets|SaveCurrentSceneIfUserWantsTo|SaveFilePanel|SaveScene|SaveSnapshot|Scale|ScaleAroundPivot|ScreenPointToRay|ScreenToGUIPoint|ScreenToViewportPoint|ScreenToWorldPoint|seed|selectionColor|SelectionGrid|sender|SendMessage|SendMessageUpwards|sendRate|Serialize|Set3Points|SetActiveRecursively|SetAnimationEvents|SetBool|SetBorderColor|SetColor|SetColors|SetColumn|SetCurve|SetDensity|SetDirty|SetEditorCurve|SetFloat|SetFromToRotation|SetGenericData|SetGlobalColor|SetGlobalFloat|SetGlobalMatrix|SetGlobalShaderProperty|SetGlobalTexture|SetGlobalVector|SetHeights|SetInt|SetLevelPrefix|SetLookRotation|SetMatrix|SetMinMax|SetNeighbors|SetNextControlName|SetNormalAndPosition|SetObjectEnabled|SetPass|SetPixel|SetPixels|SetPosition|SetReceivingEnabled|SetReplacementShader|SetResolution|SetRevertBackfacing|SetRow|SetScope|SetSendingEnabled|SetString|SetTexture|SetTextureOffset|SetTextureScale|settings|SetTriangles|SetTRS|SetVector|SetVertexCount|SetWidth|shader|shadowCascades|shadowConstantBias|shadowDistance|shadowObjectSizeBias|shadows|shadowStrength|sharedMaterial|sharedMaterials|sharedMesh|Shift|shift|Show|showCursor|ShowHelpForObject|ShowNamedHelp|sidewaysDir|sidewaysFriction|sidewaysSlip|Sign|SimpleMove|Sin|size|sizeGrow|skin|skinNormals|skybox|Sleep|sleepAngularVelocity|sleepVelocity|Slerp|slerpDrive|Slider|slopeLimit|SmoothDamp|SmoothDampAngle|smoothDeltaTime|smoothSphereCollisions|SmoothStep|SmoothTangents|softVegetation|solverIterationCount|Sort|Space|speed|splitAnimations|splitTangentsAcrossSeams|spotAngle|spring|SqrDistance|sqrMagnitude|Sqrt|srcValue|StartAssetEditing|StartDrag|startWidth|stateSynchronization|staticFriction|staticFriction2|steerAngle|stepOffset|stiffness|Stop|StopAssetEditing|streamedBytes|stretchHeight|stretchWidth|subMeshCount|supportsImageEffects|SupportsRenderTextureFormat|supportsRenderTextures|supportsShadows|suspensionDistance|suspensionSpring|swapUVChannels|swing1Limit|swing2Limit|swingAxis|SyncLayer|tabSize|tag|Tan|tangents|targetAngularVelocity|targetPosition|targetRotation|targetTexture|targetVelocity|terrainData|TestConnection|TestConnectionNAT|TestPlanesAABB|TexCoord|TexCoord2|TexCoord3|text|TextArea|textArea|textColor|TextContent|TextField|textField|texture|Texture2D|textureCoord|textureCoord2|textureFormat|thisCollider|time|timeScale|timeSinceLevelLoad|timestamp|ToAngleAxis|Toggle|toggle|Toolbar|tooltip|top|torque|transform|TransformDirection|TransformPoint|transforms|Translate|transpose|treeBillboardDistance|treeCrossFadeLength|treeDistance|treeMaximumFullLODCount|triangleIndex|TRIANGLES|triangles|TRIANGLE_STRIP|tripleClickSelectsLine|TRS|type|unassigned|UnEscapeURL|UnfocusWindow|unityVersion|Unload|UnloadLoadedObjects|UnregisterHost|Unshift|up|Update|updateRate|updateWhenOffscreen|uploadProgress|url|Use|useConeFriction|useGravity|useLimits|useMipMap|useMotor|useNat|useProxy|userData|useSpring|useWorldSpace|uv|uv2|uvAnimationCycles|uvAnimationXTile|uvAnimationYTile|ValidateMoveAsset|value|Vector2Field|Vector3Field|velocity|velocityScale|velocityUpdateMode|Vertex|Vertex3|vertexCount|vertical|VerticalScrollbar|verticalScrollbar|verticalScrollbarDownButton|verticalScrollbarThumb|verticalScrollbarUpButton|VerticalSlider|verticalSlider|verticalSliderThumb|vertices|viewID|Viewport|ViewportPointToRay|ViewportToScreenPoint|ViewportToWorldPoint|visualMode|volume|w|WakeUp|weight|weight0|weight1|weight2|weight3|white|Width|width|Window|window|wordWrap|worldCenterOfMass|worldRotationAxis|worldToCameraMatrix|worldToLocalMatrix|WorldToScreenPoint|WorldToViewportPoint|worldVelocity|wrapMode|x|xDrive|xMax|xMin|xMotion|y|yDrive|yellow|yMax|yMin|yMotion|z|zDrive|zero|zMotion|To|From|By|yield|GetTouch|GetAccelerationEvent|SetSizeXY|SetSizeXZ|SetSizeYZ|SetBuffers|Transform|TransformBillboarded|SetColor|PixelSpaceToUVSpace|PixelSpaceToUVSpace|PixelCoordToUVCoord|PixelCoordToUVCoord|AddSprite|SetBillboarded|RemoveSprite|GetSprite|TransformBillboarded|UpdatePositions|UpdateUV|UpdateColors|UpdateBounds|ScheduleBoundsUpdate|CancelBoundsUpdate|To|From|By|StopAll| )\\b',
           caseInsensitive: true },
         { token: 'support.constant.js.unity',
           regex: '\\b(?: |AnimationBlendMode|Additive|Blend|AudioImporterChannels|Automatic|Mono|Stereo|AudioImporterFormat|Automatic|OggVorbis|Uncompressed|AudioVelocityUpdateMode|Auto|Dynamic|Fixed|BuildAssetBundleOptions|CollectDependencies|CompleteAssets|BuildOptions|AutoRunPlayer|BuildAdditionalStreamedScenes|CompressTextures|ShowBuiltPlayer|StripDebugSymbols|BuildTarget|DashboardWidget|StandaloneOSXIntel|StandaloneOSXPPC|StandaloneOSXUniversal|StandaloneWindows|WebPlayerStreamed|WebPlayer|CameraClearFlags|Depth|Nothing|Skybox|SolidColor|CollisionFlags|Above|Below|None|Sides|ConfigurableJointMotion|Free|Limited|Locked|ConnectionTesterStatus|Error|PrivateIPHasNATPunchThrough|PrivateIPNoNATPunchthrough|PublicIPIsConnectable|PublicIPNoServerStarted|PublicIPPortBlocked|Undetermined|CubemapFace|NegativeX|NegativeY|NegativeZ|PositiveX|PositiveY|PositiveZ|DragAndDropVisualMode|Copy|Generic|Link|Move|None|EventType|ContextClick|DragExited|DragPerform|DragUpdated|ExecuteCommand|Ignore|KeyDown|KeyUp|Layout|MouseDown|MouseDrag|MouseMove|MouseUp|Repaint|ScrollWheel|Used|ValidateCommand|FilterMode|Bilinear|Point|Trilinear|FocusType|Keyboard|Native|Passive|ForceMode|Acceleration|Force|Impulse|VelocityChange|GizmoType|Active|NotSelected|Pickable|SelectedOrChild|Selected|HideFlags|DontSave|HideAndDontSave|HideInHierarchy|HideInInspector|NotEditable|ImagePosition|ImageAbove|ImageLeft|ImageOnly|TextOnly|ImportAssetOptions|Default|ForceDisplayPrefs|ForceSynchronousImport|ForceUpdate|ImportRecursive|MayCancelImport|RefreshDoesStartStopAssetEditing|TryFastReimportFromMetaData|JointDriveMode|None|PositionAndVelocity|Position|Velocity|JointProjectionMode|None|PositionAndRotation|PositionOnly|KeyCode|Alpha0|Alpha1|Alpha2|Alpha3|Alpha4|Alpha5|Alpha6|Alpha7|Alpha8|Alpha9|AltGr|Ampersand|Asterisk|At|A|BackQuote|Backslash|Backspace|Break|B|CapsLock|Caret|Clear|Colon|Comma|C|Delete|Dollar|DoubleQuote|DownArrow|D|End|Equals|Escape|Exclaim|E|F10|F11|F12|F13|F14|F15|F1|F2|F3|F4|F5|F6|F7|F8|F9|F|Greater|G|Hash|Help|Home|H|Insert|I|Joystick1Button0|Joystick1Button10|Joystick1Button11|Joystick1Button12|Joystick1Button13|Joystick1Button14|Joystick1Button15|Joystick1Button16|Joystick1Button17|Joystick1Button18|Joystick1Button19|Joystick1Button1|Joystick1Button2|Joystick1Button3|Joystick1Button4|Joystick1Button5|Joystick1Button6|Joystick1Button7|Joystick1Button8|Joystick1Button9|Joystick2Button0|Joystick2Button10|Joystick2Button11|Joystick2Button12|Joystick2Button13|Joystick2Button14|Joystick2Button15|Joystick2Button16|Joystick2Button17|Joystick2Button18|Joystick2Button19|Joystick2Button1|Joystick2Button2|Joystick2Button3|Joystick2Button4|Joystick2Button5|Joystick2Button6|Joystick2Button7|Joystick2Button8|Joystick2Button9|Joystick3Button0|Joystick3Button10|Joystick3Button11|Joystick3Button12|Joystick3Button13|Joystick3Button14|Joystick3Button15|Joystick3Button16|Joystick3Button17|Joystick3Button18|Joystick3Button19|Joystick3Button1|Joystick3Button2|Joystick3Button3|Joystick3Button4|Joystick3Button5|Joystick3Button6|Joystick3Button7|Joystick3Button8|Joystick3Button9|JoystickButton0|JoystickButton10|JoystickButton11|JoystickButton12|JoystickButton13|JoystickButton14|JoystickButton15|JoystickButton16|JoystickButton17|JoystickButton18|JoystickButton19|JoystickButton1|JoystickButton2|JoystickButton3|JoystickButton4|JoystickButton5|JoystickButton6|JoystickButton7|JoystickButton8|JoystickButton9|J|Keypad0|Keypad1|Keypad2|Keypad3|Keypad4|Keypad5|Keypad6|Keypad7|Keypad8|Keypad9|KeypadDivide|KeypadEnter|KeypadEquals|KeypadMinus|KeypadMultiply|KeypadPeriod|KeypadPlus|K|LeftAlt|LeftApple|LeftArrow|LeftBracket|LeftControl|LeftParen|LeftShift|LeftWindows|Less|L|Minus|Mouse0|Mouse1|Mouse2|Mouse3|Mouse4|Mouse5|Mouse6|M|Numlock|N|O|PageDown|PageUp|Pause|Period|Plus|Print|P|Question|Quote|Q|Return|RightAlt|RightApple|RightArrow|RightBracket|RightControl|RightParen|RightShift|RightWindows|R|ScrollLock|Semicolon|Slash|Space|SysReq|S|Tab|T|Underscore|UpArrow|U|V|W|X|Y|Z|LightRenderMode|Auto|ForcePixel|ForceVertex|LightShadows|Hard|None|Soft|LightType|Directional|Point|Spot|MasterServerEvent|HostListReceived|RegistrationFailedGameName|RegistrationFailedGameType|RegistrationFailedNoServer|RegistrationSucceeded|ModelImporterGenerateAnimations|InNodes|InOriginalRoots|InRoot|None|ModelImporterGenerateMaterials|None|PerSourceMaterial|PerTexture|MouseCursor|Arrow|ResizeHorizontal|ResizeVertical|Text|NetworkConnectionError|AlreadyConnectedToAnotherServer|ConnectionBanned|ConnectionFailed|CreateSocketOrThreadFailure|EmptyConnectTarget|IncorrectParameters|InternalDirectConnectFailed|InvalidPassword|NATTargetConnectionLost|NATTargetNotConnected|NoError|RSAPublicKeyMismatch|TooManyConnectedPlayers|NetworkDisconnection|Disconnected|LostConnection|NetworkPeerType|Client|Connecting|Disconnected|Server|NetworkStateSynchronization|Off|ReliableDeltaCompressed|Unreliable|ParticleRenderMode|Billboard|HorizontalBillboard|SortedBillboard|Stretch|VerticalBillboard|PhysicMaterialCombine|Average|Maximum|Minimum|Multiply|PlayMode|StopAll|StopSameLayer|PrefabType|DisconnectedModelPrefabInstance|DisconnectedPrefabInstance|MissingPrefabInstance|ModelPrefabInstance|ModelPrefab|None|PrefabInstance|Prefab|PrimitiveType|Capsule|Cube|Cylinder|Plane|Sphere|QualityLevel|Beautiful|Fantastic|Fastest|Fast|Good|Simple|QueueMode|CompleteOthers|PlayNow|RenderTextureFormat|ARGB32|Depth|ReplacePrefabOptions|ConnectToPrefab|Default|ReplaceNameBased|RigidbodyInterpolation|Extrapolate|Interpolate|None|RotationDriveMode|Slerp|XYAndZ|RPCMode|AllBuffered|All|OthersBuffered|Others|Server|RuntimePlatform|OSXDashboardPlayer|OSXEditor|OSXPlayer|OSXWebPlayer|WindowsPlayer|WindowsWebPlayer|ScaleMode|ScaleAndCrop|ScaleToFit|StretchToFill|SelectionMode|Assets|DeepAssets|Deep|Editable|ExcludePrefab|TopLevel|Unfiltered|SendMessageOptions|DontRequireReceiver|RequireReceiver|SkinQuality|Auto|Bone1|Bone2|Bone4|Space|Self|World|TerrainLighting|Lightmap|Pixel|Vertex|TextAlignment|Center|Left|Right|TextAnchor|LowerCenter|LowerLeft|LowerRight|MiddleCenter|MiddleLeft|MiddleRight|UpperCenter|UpperLeft|UpperRight|TextClipping|Clip|Overflow|TextureFormat|Alpha8|ARGB32|DXT1|DXT5|RGB24|TextureImporterFormat|Alpha8|ARGB16|ARGB32|Automatic|DXT1|DXT5|RGB16|RGB24|TextureImporterGenerateCubemap|Cylindrical|NiceSpheremap|None|SimpleSpheremap|Spheremap|TextureImporterMipFilter|BoxFilter|KaiserFilter|TextureImporterNormalFilter|Sobel|Standard|TextureImporterNPOTScale|None|ToLarger|ToNearest|ToSmaller|TextureWrapMode|Clamp|Repeat|WrapMode|ClampForever|Default|Loop|Once|PingPong|Mate|accelerationEvents|touches|touchCount|multiTouchEnabled|accelerationEventCount|acceleration|orientation|verticalOrientation|screenCanDarken|uniqueIdentifier|model|systemName|systemVersion|fingerId|position|positionDelta|timeDelta\t|tapCount|phase|Began|Moved|Stationary|Ended|Canceled|Unknown|Portrait|PortraitUpsideDown|LandscapeLeft|LandscapeRight|FaceUp|FaceDown|IPhonePlayer|SPRITE_PLANE|XY|XZ|YZ|WINDING_ORDER|CCW|CW| )\\b',
           caseInsensitive: true },
         { token: 'support.events.js.unity',
           regex: '\\b(?: |Awake|CancelInvoke|FixedUpdate|Invoke|InvokeRepeating|IsInvoking|LateUpdate|OnApplicationPause|OnApplicationQuit|OnAssignMaterialModel|OnBecameInvisible|OnBecameVisible|OnCloseWindow|OnCollisionEnter|OnCollisionExit|OnCollisionStay|OnConnectedToServer|OnControllerColliderHit|OnDisable|OnDisconnectedFromServer|OnDrawGizmos|OnDrawGizmosSelected|OnEnable|OnFailedToConnect|OnFailedToConnectToMasterServer|OnGUI|OnHierarchyWindowChange|OnInspectorUpdate|OnJointBreak|OnLevelWasLoaded|OnMouseDown|OnMouseDrag|OnMouseEnter|OnMouseExit|OnMouseOver|OnMouseUp|OnNetworkInstantiate|OnParticleCollision|OnPlayerConnected|OnPlayerDisconnected|OnPostprocessAllAssets|OnPostprocessAudio|OnPostprocessModel|OnPostprocessTexture|OnPostRender|OnPreCull|OnPreprocessAudio|OnPreprocessModel|OnPreprocessTexture|OnPreRender|OnProjectWindowChange|OnRenderImage|OnRenderObject|OnSelectionChange|OnSerializeNetworkView|OnServerInitialized|OnTriggerEnter|OnTriggerExit|OnTriggerStay|OnWillRenderObject|OnWizardCreate|OnWizardOtherButton|OnWizardUpdate|Reset|Start|StartCoroutine|StopAllCoroutines|StopCoroutine|Update|AudioImporterChannels|AudioImporterFormat|BuildAssetBundleOptions|BuildOptions|BuildTarget|DragAndDropVisualMode|GizmoType|ImportAssetOptions|ModelImporterGenerateAnimations|ModelImporterGenerateMaterials|MouseCursor|PrefabType|ReplacePrefabOptions|SelectionMode|TextureImporterFormat|TextureImporterGenerateCubemap|TextureImporterMipFilter|TextureImporterNPOTScale|TextureImporterNormalFilter| )\\b',
           caseInsensitive: true },
         { token: 'support.pragma.js.unity',
           regex: '\\b(?: |pragma|strict| )\\b',
           caseInsensitive: true } ] }
    
    this.normalizeRules();
};

unityjavascriptHighlightRules.metaData = { comment: 'Unity API Calls: version 2.1',
      fileTypes: [ 'js' ],
      foldingStartMarker: '/\\*\\*|\\{\\s*$|\\s*(case)',
      foldingStopMarker: '\\*\\*/|^\\s*\\}|^\\s*(break)',
      name: 'unityjavascript',
      scopeName: 'source.js.unity' }


oop.inherits(unityjavascriptHighlightRules, TextHighlightRules);

exports.unityjavascriptHighlightRules = unityjavascriptHighlightRules;
});

ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/)#(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/unityjavascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/unityjavascript_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var unityjavascriptHighlightRules = require("./unityjavascript_highlight_rules").unityjavascriptHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = unityjavascriptHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/unityjavascript"
}).call(Mode.prototype);

exports.Mode = Mode;
});
