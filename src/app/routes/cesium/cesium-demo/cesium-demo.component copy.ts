import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  Viewer,
  Cartesian3,
  Color,
  GeoJsonDataSource,
  Math,
  HeadingPitchRange,
  Transforms,
  HeadingPitchRoll,
  BoundingSphere,
  ArcGisMapServerImageryProvider,
  IonImageryProvider,
  TerrainProvider,
  CesiumTerrainProvider,
  IonResource,
  Cesium3DTileset
} from 'cesium';

@Component({
  selector: 'app-cesium-cesium-demo',
  templateUrl: './cesium-demo.component.html'
})
export class CesiumCesiumDemoComponent implements OnInit {
  viewer?: Viewer;
  options: Viewer.ConstructorOptions = {
    animation: false,
    timeline: false
  };
  constructor(private http: _HttpClient) {}

  ngOnInit(): void {
    // Viewer Scene Entity DataSourceCollection
    // this.viewer = new Viewer('cesiumContainer', this.options);
    // this.viewer.scene.globe.show = false;
    // console.log(this.viewer.imageryLayers === this.viewer.scene.imageryLayers);
    // this.viewer.scene.camera.setView({
    //   destination: Cartesian3.fromDegrees(114.551843, 38.051169, 1500)
    // });
    // const entity = this.viewer.entities.add({
    //   position: Cartesian3.fromDegrees(114.551843, 38.051169, 400),
    //   point: {
    //     pixelSize: 100,
    //     color: new Color(0, 1, 0, 1)
    //   }
    // });
    // this.viewer.trackedEntity = entity;

    // CzmlDataSource KmlDataSource GeoJsonDataSource
    // this.viewer.dataSources.add(GeoJsonDataSource.load('../../../assets/tmp/ne_10m_us_states.topojson'));

    // Cesium相机系统 setView flyTo lookAt viewBoundingSphere
    // const position = Cartesian3.fromDegrees(114.551843, 38.051169, 1500);
    // this.viewer.camera.setView({
    //   destination: position,
    //   orientation: {
    //     heading: Math.toRadians(0),
    //     pitch: Math.toRadians(-90),
    //     roll: 0
    //   }
    // });
    // this.viewer.camera.flyTo({
    //   destination: position,
    //   orientation: {
    //     heading: Math.toRadians(0),
    //     pitch: Math.toRadians(-90),
    //     roll: 0
    //   },
    //   duration: 5
    // });

    // const center = Cartesian3.fromDegrees(114.551843, 38.051169);
    // const heading = Math.toRadians(50);
    // const pitch = Math.toRadians(-90);
    // const range = 1500;
    // this.viewer.camera.lookAt(center, new HeadingPitchRange(heading, pitch, range));

    // const position = Cartesian3.fromDegrees(114.551843, 38.051169, 1500);
    // const orientation = Transforms.headingPitchRollQuaternion(position, new HeadingPitchRoll(-90, 0, 0));
    // const entity = this.viewer.entities.add({
    //   position: position,
    //   // orientation: orientation, // TODO API更新了
    //   model: {
    //     uri: '../../../assets/tmp/models/CesiumAir/Cesium_Air.glb',
    //     minimumPixelSize: 100,
    //     maximumScale: 10000,
    //     show: true
    //   }
    // });
    // this.viewer.camera.viewBoundingSphere(new BoundingSphere(position, 20), new HeadingPitchRange(0, 0, 0));

    // 加载地图
    const esri = new ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    });
    this.options.baseLayerPicker = false;
    // this.options.imageryProvider = esri;
    this.options.terrainProvider = new CesiumTerrainProvider({
      url: IonResource.fromAssetId(1),
      requestVertexNormals: true,
      requestWaterMask: true
    });
    this.viewer = new Viewer('cesiumContainer', this.options);
    // const layer = this.viewer.imageryLayers.addImageryProvider(new IonImageryProvider({ assetId: 3812 }));

    // 添加建筑物
    const tileSet = this.viewer.scene.primitives.add(
      new Cesium3DTileset({
        url: IonResource.fromAssetId(96188)
      })
    );
    this.viewer.camera.setView({
      destination: Cartesian3.fromDegrees(121.49, 31.23, 3000),
      orientation: {
        heading: 0,
        pitch: -90,
        roll: 0
      }
    });
  }
}
