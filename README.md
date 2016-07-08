# shape-3d

A web app to extrude 2D shapes to 3D models and view them

## Installation

```
npm install
```

## Preparation to extrude 2D shapes to 3D models

### Thumbnail images

Put images to

```
public/images/*.jpg
```

### 2D Shapes

Put shapes (GeoJSON, type:Polygon) to

```
public/shapes/*.json
```

Shape files are able to be made by [image-to-shape](https://github.com/knt5/image-to-shape) from image files.

### Textures

Put texture images to

```
# Ground texture
public/textures/ground/1.png

# Extruded object texture
public/textures/object/1.png
```
