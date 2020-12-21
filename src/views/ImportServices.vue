<template>
  <div class=" mt-2">
    <div class="md-toolbar-section-end  mb-1">
      <div class="align-center">
        <span class="md-caption"
          >Download form template in <strong>EXCEL</strong> or
          <strong>CSV</strong></span
        >
        <md-button class="md-raised md-primary">Download</md-button>
      </div>
      <!-- <md-button class="">Upload</md-button> -->
      <!-- <input type="file" id="myFile" class="md-raised" name="filename" > -->
    </div>
    <div class="container mt-2">
      <section>
        <div class="md-body-1">
          To import your existing service click upload.
        </div>
        <div class="md-caption">
          <strong>Note:</strong> Please download the template from top right and
          make sure you have added item in respected column.
        </div>
        <div class="md-caption">If miss aligned it may not be uploaded.</div>
        <label class="md-button md-raised md-primary mt-2" v-if="file == null">
          Upload
          <input type="file" @change="onChange" accept=".xlsx, .xls, .csv" />
        </label>
        <md-button v-if="file != null" class="md-raised md-primary mt-2"
          >Update services</md-button
        >
        <div v-if="file != null" class="md-error">
          File Name : <b>{{ this.file.name }}</b> | File Type :
          <strong>{{ this.fileType }}</strong>
        </div>

        <div v-if="file == null" class="md-body-1">
          Allowed <strong>.xls, .xlsx, .csv only.</strong>
        </div>
        <xlsx-read :file="file">
          <!-- <xlsx-table :sheet="selectedSheet" /> -->
          <xlsx-json
            :sheet="selectedSheet"
            v-model="dataset"
            @parsed="converted"
          >
          </xlsx-json>
        </xlsx-read>
      </section>
    </div>
  </div>
</template>
<script>
import {
  XlsxRead,
  //   XlsxTable,
  //   XlsxSheets,
  XlsxJson
  //   XlsxWorkbook,
  //   XlsxSheet,
  //   XlsxDownload
} from 'vue-xlsx/dist/vue-xlsx.es.js'
export default {
  name: 'importServices',
  components: {
    XlsxRead,
    // XlsxTable,
    // XlsxSheets,
    XlsxJson
    // XlsxWorkbook,
    // XlsxSheet,
    // XlsxDownload
  },
  data () {
    return {
      file: null,
      fileType: null,
      dataset: null
    }
  },
  methods: {
    onChange (event) {
      this.file = event.target.files ? event.target.files[0] : null
      this.validate()
      // console.log('onChange', event)
    },
    converted (value) {
      this.dataset = value
      // console.log('converted', value)
    },
    validate: function () {
      switch (this.file.type) {
        case 'text/csv':
          this.fileType = 'CSV File'
          break
        case 'application/vnd.ms-excel':
          this.fileType = 'Excel File'
          break
        default:
          this.fileType = 'File Type not allowed'
          //   this.file = null
          //   this.fileType = null
          this.dataset = null
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
}

label {
  padding: 7px;
  background-color: black;
  color: white;
  text-align: center;
}
</style>
