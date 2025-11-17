// @ts-nocheck
// https://github.com/bespired/mapcode/blob/main/src/helpers/Zone.js

import { ZoneCoords } from "../constants/zones"
    // Japan Mapcode Zones as I think Denso has made them
    // Many thanks to
    // https://saibara.sakura.ne.jp/map/convgeo.cgi

const Zone = {

    getZoneCoords() {
        return ZoneCoords
    },

    pad(val, len) {
        return ('000'+val).substr(-len)
    },

    align(val, len) {
        return ('····' + val).substr(-len)
    },


    mapCode(lat, lon) {

        // return '0 000 000*00';

        const zones = Zone.inZone(lat, lon)

        if (!zones.length) return 'Out of bounds'

        const inzone = zones[0]
        const zone = inzone.zone
        const flat= ZoneCoords[zone][0], flon= ZoneCoords[zone][1]
        const tlat= ZoneCoords[zone][2], tlon= ZoneCoords[zone][3]

        const perc= this.percentages(flat,flon, tlat,tlon, lat, lon)

        let ret = ''
        if (zone == 0) {
            if (perc.block.id == 0) {
                if (perc.unit.id == 0) {
                    return '*' + this.pad(perc.core.id, 2)
                }
                return perc.unit.id + '*' + this.pad(perc.core.id, 2)
            }
            ret += perc.block.id + ' '
            ret += this.pad(perc.unit.id, 3) + '*'
            ret += this.pad(perc.core.id, 2)
            return ret
        }

        ret += zone + ' '
        ret += this.pad(perc.block.id, 3) + ' '
        ret += this.pad(perc.unit.id, 3) + '*'
        ret += this.pad(perc.core.id, 2)
        return ret

    },

    inZone(lat, lon) {
        const zones = []
        const keys  = Object.keys(ZoneCoords)
        keys.forEach( idx => {
            if ((lat >= ZoneCoords[idx][0]) && (lat < ZoneCoords[idx][2])) {
                if ((lon >= ZoneCoords[idx][1]) && (lon < ZoneCoords[idx][3])) {
                    zones.push({
                        zone: idx,
                        from: { lat: ZoneCoords[idx][0], lon: ZoneCoords[idx][1]},
                        to:   { lat: ZoneCoords[idx][2], lon: ZoneCoords[idx][3]}
                    })
                }
            }
        })
        return zones
    },

    percentages(flat,flon, tlat,tlon, lat,lon) {
            const dlat= tlat-flat, dlon= tlon-flon

            // Get Block

            const blockLonPerc = (lon-flon) / dlon
            const blockLatPerc = (lat-flat) / dlat

            const xblock= Math.floor(blockLonPerc * 30)
            const yblock= Math.floor(blockLatPerc * 30)

            const block = yblock * 30 + xblock

            const blockheight = dlat / 30.0
            const blockwidth  = dlon / 30.0
            const blockstartlat = flat + yblock * blockheight
            const blockstartlon = flon + xblock * blockwidth

            // Get Unit

            const unitLatPerc = (lat-blockstartlat) / blockheight
            const unitLonPerc = (lon-blockstartlon) / blockwidth

            const xunit= Math.floor(unitLonPerc * 30)
            const yunit= Math.floor(unitLatPerc * 30)

            const unit = (yunit % 30) * 30 + (xunit % 30)

            const unitheight = dlat / 900.0
            const unitwidth  = dlon / 900.0
            const unitstartlat = blockstartlat + yunit * unitheight
            const unitstartlon = blockstartlon + xunit * unitwidth

            // Get S-core

            const coreLatPerc = (lat-unitstartlat) / unitheight
            const coreLonPerc = (lon-unitstartlon) / unitwidth

            const xcore= Math.floor(coreLonPerc * 10)
            const ycore= Math.floor(coreLatPerc * 10)

            const core = (ycore % 10) * 10 + (xcore % 10)

            const coreheight = dlat / 8100.0
            const corewidth  = dlon / 8100.0
            const corestartlat = unitstartlat + ycore * coreheight
            const corestartlon = unitstartlon + xcore * corewidth


            return {
                block: { id: block, lat: blockLatPerc, lon: blockLonPerc },
                unit:  { id: unit,  lat: unitLatPerc,  lon: unitLonPerc },
                core:  { id: core,  lat: coreLatPerc,  lon: coreLonPerc },
                draw: {
                    block: {
                        from:{ lat: blockstartlat, lon: blockstartlon},
                        to:  { lat: blockstartlat + blockheight, lon: blockstartlon + blockwidth }
                    },
                    unit: {
                        from:{ lat: unitstartlat, lon: unitstartlon},
                        to:  { lat: unitstartlat + unitheight, lon: unitstartlon + unitwidth }
                    },
                    core: {
                        from:{ lat: corestartlat, lon: corestartlon},
                        to:  { lat: corestartlat + coreheight, lon: corestartlon + corewidth }
                    },
                }
            }

    },


    infobox(lat, lon) {

        const zones = this.inZone(lat, lon)
        if (zones.length == 0) {
            return { html: 'Out of bounds', perc: null }
        }

        const inzone = zones[0]
        const zone = inzone.zone
        const flat= ZoneCoords[zone][0], flon= ZoneCoords[zone][1]
        const tlat= ZoneCoords[zone][2], tlon= ZoneCoords[zone][3]
        const dlat= tlat-flat, dlon= tlon-flon

        const perc= this.percentages(flat,flon, tlat,tlon, lat, lon)

        let html = ''
        html += `Coor ${lat}, ${lon}<br>`
        html += `From ${flat.toFixed(7)}, ${flon.toFixed(7)}<br>`
        html += `To &nbsp;&nbsp;${tlat.toFixed(7)}, ${tlon.toFixed(7)}<br>`
        html += `Dist ${dlat.toFixed(7)}, ${dlon.toFixed(7)}<br><br>`

        html += `Zone &nbsp${inzone.zone}<br>`
        html += `Block     ${this.align(perc.block.id, 3)} (lat(y):${perc.block.lat.toFixed(8)}, lon(x):${perc.block.lon.toFixed(8)})<br>`
        html += `Unit &nbsp${this.align(perc.unit.id , 3)} (lat(y):${ perc.unit.lat.toFixed(8)}, lon(x):${ perc.unit.lon.toFixed(8)})<br>`
        html += `Core &nbsp${this.align(perc.core.id , 3)} (lat(y):${ perc.core.lat.toFixed(8)}, lon(x):${ perc.core.lon.toFixed(8)})<br>`


        return { html, perc }
    },

}

export default Zone
