<template>
    <div>
        <div class="">
            <el-upload
                    class="upload-container"
                    :show-file-list="uploadShowFile"
                    action="/ptyt/customs/kits/uploadWithPath"
                    :headers="uploadHeader"
                    :data="uploadData"
                    :on-success="uploadSuccess">
                <div class="kits-btn upload-btn">
                    <i class="fa fa-cloud-upload"></i> 本地上传
                </div>
            </el-upload>

            <div class="kits-btn folder-btn" @click="createFolder">
                <i class="fa fa-folder"></i> 新建文件夹
            </div>
            <div class="kits-btn back-btn" @click="preList">
                <i class="fa fa-backward"></i> 返回上一级
            </div>
            <div class="kits-btn refresh-btn" @click="currentList">
                <i class="fa fa-refresh"></i> 刷新
            </div>
        </div>
        <el-row class="current-path">
            当前目录：{{currentPath}}
        </el-row>
        <el-row class="table-main">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                    element-loading-text="加载中"
                    @row-click="rowClick">
                <el-table-column
                        prop="name"
                        label="文件名"
                        width="200px">
                </el-table-column>
                <el-table-column
                        prop="path"
                        label="路径">
                </el-table-column>
                <el-table-column
                        prop="length"
                        label="大小"
                        width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.length | fileSizeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="modifyTime"
                        label="修改时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type === 2"
                             class="edit-button upload-btn"
                             @click="download(scope.row)">
                            <i class="fa fa-cloud-download"></i> 下载
                        </div>
                        <div v-if="scope.row.type === 2"
                             class="edit-button share-btn"
                             @click="share(scope.row)">
                            <i class="fa fa-share-alt"></i> 链接
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

    </div>

</template>

<script>
    import {bytesToSize, bytesFormat} from '@/utils/utils'
    import store from '@/store'

    export default {
        name: 'mainIndex',
        components: {},
        data() {
            return {
                tableData: {},
                prePath: '',
                loading: false,
                uploadHeader: {
                    'Authorization': 'Bearer ' + store.getters.token,
                },
                uploadData: {
                    filePath: ''
                },
                uploadShowFile: false,
                currentPath: '/'
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.loading = true
                this.$api.httpGet('/ptyt/customs/kits/getRootFileList').then(res => {
                    this.loading = false
                    this.tableData = res.data
                })
            },
            rowClick(row, column, event) {
                if (row.type === 1) {
                    this.loading = true
                    this.getDirList(row.path, false)
                    this.currentPath = row.path
                    this.uploadData.filePath = row.path
                }
            },
            preList() {
                this.loading = true
                let path = ''
                let array = this.currentPath.split('/')
                if (array != null && array.length > 0) {
                    array.forEach((a, i) => {
                        if (i != array.length - 1 && a != '') {
                            path = path + '/' + a
                        }
                    })
                }
                if(path === '/' || path === '') {
                    path = ''
                    this.currentPath = '/'
                    this.uploadData.filePath = '/'
                } else {
                    this.currentPath = path
                    this.uploadData.filePath = path
                }
                this.getDirList(path, false)
            },
            currentList() {
                this.loading = true
                if (this.currentPath === '/') {
                    this.prePath = '/'
                    this.init()
                } else {
                    this.getDirList(this.currentPath, true)
                }
            },
            getDirList(dir, isCurrent) {
                this.$api.httpGet('/ptyt/customs/kits/getFileListByDir?dir=' + dir).then(res => {
                    this.loading = false
                    this.tableData = res.data
                })
            },
            createFolder() {
                this.$prompt('请输入文件夹名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    if(value.split(" ").join("").length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '文件名不能为空！'
                        })
                        return
                    }
                    this.$api.httpPost('/ptyt/customs/kits/createFolder', {
                        folderPath: this.currentPath + '/' + value
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '创建成功！'
                            })
                            this.currentList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg ? res.data.msg : '未知错误'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })

            },
            uploadSuccess() {
                this.$message({
                    type: 'success',
                    message: '上传成功！'
                })
                this.currentList()
            },
            download(row) {
                // this.$api.httpGet('/ptyt/customs/kits/download?filePath=' + row.path).then(res => {
                //     console.log(res)
                // })
                location.href = '/kits/download?filePath=' + row.path
            }
        },
        filters: {
            fileSizeFilter(size) {
                return bytesFormat(size)
            }
        },
    }
</script>

<style lang="scss">

    .upload-container {
        display: inline-block;
    }

    .kits-btn {
        padding: 7px;
        margin: 0px 10px 10px 0px;
        display: inline-block;
        border-radius: 3px;
        color: #ffffff;
        font-size: 15px;
        cursor: pointer;

        i {
            /*font-size: 20px;*/
        }
    }

    .current-path {
        padding: 10px 5px;
        margin: 0px 0px 10px 0px;
        border-left: 5px solid #669900;
        font-size: 15px;
        color: #606266;
        background: #f2f2f2;
    }

    .el-table__row:hover {
        cursor: pointer !important;
    }

    .upload-btn {
        background: #57a344;
    }

    .folder-btn {
        background: #0bc4de;
    }

    .back-btn {
        background: #ee9900;
    }

    .refresh-btn {
        background: #0086b3;
    }

    .share-btn {
        background: #ee9900;
    }

    .edit-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        color: #ffffff;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin-right: 5px;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 8px 10px;
        border-radius: 3px;
        font-size: 1.5vh;
    }
</style>
