<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis minScale="1e+08" hasScaleBasedVisibilityFlag="0" version="3.14.1-Pi" styleCategories="AllStyleCategories" maxScale="0">
  <flags>
    <Identifiable>1</Identifiable>
    <Removable>1</Removable>
    <Searchable>1</Searchable>
  </flags>
  <temporal fetchMode="0" mode="0" enabled="0">
    <fixedRange>
      <start></start>
      <end></end>
    </fixedRange>
  </temporal>
  <customproperties>
    <property key="WMSBackgroundLayer" value="false"/>
    <property key="WMSPublishDataSourceUrl" value="false"/>
    <property key="embeddedWidgets/count" value="0"/>
    <property key="identify/format" value="Value"/>
  </customproperties>
  <pipe>
    <rasterrenderer band="1" opacity="1" alphaBand="-1" type="singlebandpseudocolor" classificationMin="50" nodataColor="" classificationMax="inf">
      <rasterTransparency/>
      <minMaxOrigin>
        <limits>None</limits>
        <extent>WholeRaster</extent>
        <statAccuracy>Estimated</statAccuracy>
        <cumulativeCutLower>0.02</cumulativeCutLower>
        <cumulativeCutUpper>0.98</cumulativeCutUpper>
        <stdDevFactor>2</stdDevFactor>
      </minMaxOrigin>
      <rastershader>
        <colorrampshader colorRampType="DISCRETE" minimumValue="50" maximumValue="inf" clip="0" classificationMode="2">
          <colorramp type="gradient" name="[source]">
            <prop k="color1" v="145,255,0,255"/>
            <prop k="color2" v="189,0,113,255"/>
            <prop k="discrete" v="0"/>
            <prop k="rampType" v="gradient"/>
            <prop k="stops" v="0.25;212,254,0,255:0.479567;253,245,0,255:0.75;240,72,0,255"/>
          </colorramp>
          <item color="#95e063" alpha="255" label="&lt;= 50" value="50"/>
          <item color="#63c700" alpha="255" label="50 - 55" value="55"/>
          <item color="#ffff03" alpha="255" label="55 - 60" value="60"/>
          <item color="#ffcd69" alpha="255" label="60 - 65" value="65"/>
          <item color="#ff8203" alpha="255" label="65 - 70" value="70"/>
          <item color="#ff0303" alpha="255" label="> 70" value="inf"/>
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
    <brightnesscontrast contrast="0" brightness="0"/>
    <huesaturation colorizeOn="0" colorizeBlue="128" colorizeStrength="100" colorizeGreen="128" saturation="0" grayscaleMode="0" colorizeRed="255"/>
    <rasterresampler maxOversampling="2"/>
  </pipe>
  <blendMode>0</blendMode>
</qgis>
