<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis hasScaleBasedVisibilityFlag="0" version="3.14.1-Pi" minScale="1e+08" maxScale="0" styleCategories="AllStyleCategories">
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
    <rasterrenderer classificationMax="inf" nodataColor="" opacity="1" alphaBand="-1" band="1" type="singlebandpseudocolor" classificationMin="50">
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
        <colorrampshader maximumValue="inf" colorRampType="DISCRETE" clip="0" minimumValue="50" classificationMode="2">
          <colorramp name="[source]" type="gradient">
            <prop v="145,255,0,255" k="color1"/>
            <prop v="189,0,113,255" k="color2"/>
            <prop v="0" k="discrete"/>
            <prop v="gradient" k="rampType"/>
            <prop v="0.25;212,254,0,255:0.479567;253,245,0,255:0.75;240,72,0,255" k="stops"/>
          </colorramp>
          <item label="&lt;= 50" value="50" alpha="255" color="#95e063"/>
          <item label="50 - 55" value="55" alpha="255" color="#63c700"/>
          <item label="55 - 60" value="60" alpha="255" color="#ffff03"/>
          <item label="60 - 65" value="65" alpha="255" color="#ffcd69"/>
          <item label="65 - 70" value="70" alpha="255" color="#ff8203"/>
          <item label="70 - 75" value="75" alpha="255" color="#ff0303"/>
          <item label="> 75" value="inf" alpha="255" color="#ff00ff"/>
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
    <brightnesscontrast brightness="0" contrast="0"/>
    <huesaturation saturation="0" colorizeGreen="128" colorizeStrength="100" colorizeBlue="128" colorizeOn="0" colorizeRed="255" grayscaleMode="0"/>
    <rasterresampler maxOversampling="2"/>
  </pipe>
  <blendMode>0</blendMode>
</qgis>
