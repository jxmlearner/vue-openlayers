<template>
    <div class="area-map-container">
        <div class="map"></div>
        <realtime-records />
    </div>
</template>

<script>
    import '../assets/theme/common.styl'
    import '../assets/theme/theme-light/index.styl'

    import RealtimeRecords from '../components/RealtimeRecords'
    export default {
        components: {
            RealtimeRecords
        }
    }
</script>