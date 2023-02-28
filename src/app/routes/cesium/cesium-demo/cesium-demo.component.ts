import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  Viewer,
  Cartesian3,
  Color,
  GeoJsonDataSource,
  Math,
  HeadingPitchRange,
  HeadingPitchRoll,
  BoundingSphere,
  ArcGisMapServerImageryProvider,
  IonImageryProvider,
  TerrainProvider,
  CesiumTerrainProvider,
  IonResource,
  Cesium3DTileset,
  Transforms,
  UrlTemplateImageryProvider,
  ScreenSpaceEventHandler,
  Cartographic,
  ScreenSpaceEventType,
  Cartesian2,
  Plane,
  ParticleSystem,
  CircleEmitter,
  Entity,
  Matrix4
} from 'cesium';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cesium-cesium-demo',
  templateUrl: './cesium-demo.component.html'
})
export class CesiumCesiumDemoComponent implements OnInit {
  viewer?: Viewer;
  options: Viewer.ConstructorOptions = {
    animation: false,
    timeline: false,
    infoBox: false,
    selectionIndicator: false,
    shadows: false,
    shouldAnimate: true
  };
  visible = true;
  imgLayer: any;
  factoryEntity: Entity | undefined;
  fire: any;
  wuRan: boolean = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  constructor(private http: _HttpClient, private message: NzMessageService) {}

  ngOnInit(): void {
    this.viewer = new Viewer('cesiumContainer', this.options);
    // 114.54531048834342,Lat=>38.04560680334932

    // viewer.trackedEntity = entity;
    // viewer.camera.lookAt(position, new HeadingPitchRange(200, -90, 500));

    // var imgLayer = new UrlTemplateImageryProvider({
    //   // url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', // 高德矢量
    //   url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    //   minimumLevel: 3,
    //   maximumLevel: 18
    // });
    // this.viewer.imageryLayers.addImageryProvider(imgLayer);

    // var annLayer = new UrlTemplateImageryProvider({
    //   url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',

    //   minimumLevel: 3,

    //   maximumLevel: 18
    // });

    // viewer.imageryLayers.addImageryProvider(annLayer);

    this.viewer.camera.setView({
      destination: Cartesian3.fromDegrees(114.54641119290045, 38.041003611189464, 13800000),
      orientation: {
        heading: Math.toRadians(0),
        pitch: Math.toRadians(-90),
        roll: 0
      }
    });

    var handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);
    handler.setInputAction((event: { position: Cartesian2 }) => {
      var earthPosition = this.viewer?.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid);
      var cartographic = Cartographic.fromCartesian(earthPosition!, this.viewer?.scene.globe.ellipsoid, new Cartographic());
      var lat = Math.toDegrees(cartographic.latitude);
      var lng = Math.toDegrees(cartographic.longitude);
      var height = cartographic.height;
      console.log(`[Lng=>${lng},Lat=>${lat},H=>${height}]`);
      const pick = this.viewer?.scene.pick(event.position);
      if (pick) {
        console.log(pick.id.description._value);
        this.message.info(pick.id.description._value);
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
    this.doAddCompanyBuilding();
    this.doAddCompanyLogo();
    this.doAddHome();
    this.doAddFactory();
  }

  // 加载图层
  doAddImageryProvider(url: string): void {
    this.viewer?.imageryLayers.remove(this.imgLayer);
    if (url !== '') {
      this.imgLayer = new UrlTemplateImageryProvider({
        url: url,
        minimumLevel: 3,
        maximumLevel: 18
      });
      this.viewer?.imageryLayers.addImageryProvider(this.imgLayer);
    }
  }

  // doChangeOption(): void {
  // }
  doAddWindLayer(): void {
    // const windOptions = {
    //   colorScale: [
    //     'rgb(36,104, 180)',
    //     'rgb(60,157, 194)',
    //     'rgb(128,205,193 )',
    //     'rgb(151,218,168 )',
    //     'rgb(198,231,181)',
    //     'rgb(238,247,217)',
    //     'rgb(255,238,159)',
    //     'rgb(252,217,125)',
    //     'rgb(255,182,100)',
    //     'rgb(252,150,75)',
    //     'rgb(250,112,52)',
    //     'rgb(245,64,32)',
    //     'rgb(237,45,28)',
    //     'rgb(220,24,32)',
    //     'rgb(180,0,35)'
    //   ],
    //   frameRate: 16,
    //   maxAge: 60,
    //   globalAlpha: 0.9,
    //   velocityScale: 1 / 30,
    //   paths: 2000
    // };
    // fetch('../../../assets/tmp/wind.json')
    //   .then(res => res.json())
    //   .then(res => {
    //     const windLayer = new CesiumWind(res, { windOptions });
    //     windLayer.addTo(this.viewer);
    //   });
  }

  doFlyToCompany() {
    this.viewer?.camera.flyTo({
      destination: Cartesian3.fromDegrees(114.54533201023109, 38.045111797107, 500),
      orientation: {
        heading: Math.toRadians(0),
        pitch: Math.toRadians(-90),
        roll: 0
      },
      maximumHeight: 1000,
      complete: () => {
        // this.viewer?.camera.lookAt(
        //   Cartesian3.fromDegrees(114.54533201023109, 38.045111797107),
        //   new HeadingPitchRange(Math.toRadians(0), Math.toRadians(-90), 0)
        // );
        // TODO flyTo 目前和 viewBoundingSphere 有些冲突，未解决
        this.doSetViewBoundingSphere();
      },
      duration: 5
    });
  }

  doFlyToHome() {
    this.viewer?.camera.flyTo({
      destination: Cartesian3.fromDegrees(114.55508833558278, 38.05767941742101, 500),
      orientation: {
        heading: Math.toRadians(0),
        pitch: Math.toRadians(-90),
        roll: 0
      },
      maximumHeight: 1000,
      complete: () => {
        this.doSetViewBoundingSphereOfHome();
      },
      duration: 5
    });
    // const heading = Math.toRadians(50);
    // const pitch = Math.toRadians(-90);
    // const range = 1500;
    // this.viewer?.camera.lookAt(
    //   Cartesian3.fromDegrees(114.55508833558278, 38.05767941742101, 500),
    //   new HeadingPitchRange(heading, pitch, range)
    // );
  }

  doAddCompanyBuilding(): void {
    const position = Cartesian3.fromDegrees(114.54533201023109, 38.045111797107, 0);
    const heading = Math.toRadians(0);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    const entity = this.viewer?.entities.add({
      name: 'orientation',
      position: position,
      //@ts-ignore
      orientation: orientation, // TODO API更新了
      model: {
        // uri: '../../../assets/tmp/models/CesiumMilkTruck/CesiumMilkTruck.glb',
        uri: '../../../assets/tmp/386_wabasha_street_north.glb',
        minimumPixelSize: 0,
        maximumScale: 10000,
        show: true,
        scale: 0.008
      },
      description: `东方联信科技有限公司欢迎您！`
    });
    const position2 = Cartesian3.fromDegrees(114.54533201023109, 38.04550680334932, 0);
    const entity2 = this.viewer?.entities.add({
      name: 'orientation',
      position: position2,
      //@ts-ignore
      orientation: orientation, // TODO API更新了
      model: {
        // uri: '../../../assets/tmp/models/CesiumMilkTruck/CesiumMilkTruck.glb',
        uri: '../../../assets/tmp/386_wabasha_street_north.glb',
        minimumPixelSize: 0,
        maximumScale: 10000,
        show: true,
        scale: 0.008
      }
    });
  }

  doSetViewBoundingSphere(): void {
    const hpr2 = new HeadingPitchRange(Math.toRadians(-25), Math.toRadians(-45), 0);
    this.viewer?.camera.viewBoundingSphere(new BoundingSphere(Cartesian3.fromDegrees(114.54533201023109, 38.045111797107, 0), 150), hpr2);
  }

  doSetViewBoundingSphereOfHome(): void {
    const hpr2 = new HeadingPitchRange(Math.toRadians(-25), Math.toRadians(-45), 0);
    this.viewer?.camera.viewBoundingSphere(new BoundingSphere(Cartesian3.fromDegrees(114.55508833558278, 38.05767941742101, 0), 150), hpr2);
  }

  doAddCompanyLogo(): void {
    this.viewer?.entities.add({
      position: Cartesian3.fromDegrees(114.54546701023109, 38.045111797107, 64),
      plane: {
        plane: new Plane(Cartesian3.UNIT_X, 0.0),
        dimensions: new Cartesian2(30, 8.5),
        //@ts-ignore
        material: '../../../assets/image/logo.jpg',
        shadows: 1
      }
    });
  }

  doAddHome(): void {
    const position = Cartesian3.fromDegrees(114.55508833558278, 38.05767941742101, 0);
    const heading = Math.toRadians(0);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    const entity = this.viewer?.entities.add({
      name: 'orientation',
      position: position,
      //@ts-ignore
      orientation: orientation, // TODO API更新了
      model: {
        // uri: '../../../assets/tmp/models/CesiumMilkTruck/CesiumMilkTruck.glb',
        uri: '../../../assets/tmp/residential_district.glb',
        minimumPixelSize: 0,
        maximumScale: 10000,
        show: true,
        scale: 0.011
      },
      description: '程序员的家'
    });
  }
  doFlyToFactory(): void {
    const lng = 115.26513070669762;
    const lat = 40.14153477557711;
    this.viewer?.camera.flyTo({
      destination: Cartesian3.fromDegrees(lng, lat, 500),
      orientation: {
        heading: Math.toRadians(0),
        pitch: Math.toRadians(-90),
        roll: 0
      },
      // maximumHeight: 1000,
      complete: () => {
        this.doFactory();
      },
      duration: 5
    });
  }

  doAddFactory(): void {
    const lng = 115.26513070669762;
    const lat = 40.14153477557711;
    const position = Cartesian3.fromDegrees(lng, lat, 0);
    const heading = Math.toRadians(30);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    this.factoryEntity = this.viewer?.entities.add({
      name: 'orientation',
      position: position,
      //@ts-ignore
      orientation: orientation, // TODO API更新了
      model: {
        // uri: '../../../assets/tmp/models/CesiumMilkTruck/CesiumMilkTruck.glb',
        uri: '../../../assets/tmp/factory.glb',
        minimumPixelSize: 0,
        maximumScale: 10000,
        show: true,
        scale: 20
      },
      description: '涿鹿金隅水泥有限公司'
    });
    this.fire = new ParticleSystem({
      image: '../../../assets/image/dust.png',
      imageSize: new Cartesian2(10, 10),
      startScale: 1.0,
      endScale: 50,
      particleLife: 5.0,
      speed: 3.0,
      emitter: new CircleEmitter(500),
      emissionRate: 1.0,
      //@ts-ignore
      modelMatrix: this.factoryEntity?.computeModelMatrix(this.viewer.clock.startTime, new Matrix4())
    });
  }

  doFactory(): void {
    const lng = 115.26513070669762;
    const lat = 40.14083477557711;
    const hpr2 = new HeadingPitchRange(Math.toRadians(0), Math.toRadians(-50), 0);
    this.viewer?.camera.viewBoundingSphere(new BoundingSphere(Cartesian3.fromDegrees(lng, lat, 0), 250), hpr2);
  }

  doFire(): void {
    this.wuRan = !this.wuRan;
    this.fire = new ParticleSystem({
      image: '../../../assets/image/dust.png',
      imageSize: new Cartesian2(10, 10),
      startScale: 1.0,
      endScale: 50,
      particleLife: 5.0,
      speed: 3.0,
      emitter: new CircleEmitter(500),
      emissionRate: 1.0,
      //@ts-ignore
      modelMatrix: this.factoryEntity?.computeModelMatrix(this.viewer.clock.startTime, new Matrix4())
    });

    if (!this.viewer?.scene.primitives.contains(this.fire)) this.viewer?.scene.primitives.add(this.fire);
  }
  doCancelFire(): void {
    this.wuRan = !this.wuRan;
    if (this.fire) this.viewer?.scene.primitives.remove(this.fire);
  }

  // Lng=>,Lat=>
  doWaterCar(): void {
    const lng = 115.26558424919656;
    const lat = 40.14065359604557;
    const position = Cartesian3.fromDegrees(lng, lat, -8);
    const heading = Math.toRadians(30);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    const car = this.viewer?.entities.add({
      name: 'orientation',
      position: position,
      //@ts-ignore
      orientation: orientation, // TODO API更新了
      model: {
        // uri: '../../../assets/tmp/models/CesiumMilkTruck/CesiumMilkTruck.glb',
        uri: '../../../assets/tmp/car.glb',
        // uri: '/minio/demo/car.glb',
        minimumPixelSize: 0,
        maximumScale: 10000,
        show: true,
        scale: 45
      },
      description: '洒水车'
    });
  }
}
