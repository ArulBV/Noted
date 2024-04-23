<template>
    <div class="row">
        <div class="col s6 m3 l3" v-for="(noteDetail, index) in noteDetails" :key="index">
            <div class="card darken-1">
                <div class="card-content">
                    <span class="card-title center"><strong>{{ noteDetail.noteTitle }}</strong></span>
                    <p>{{ noteDetail.noteDesc }}</p>
                </div>
                <div class="card-action align-right">
                    <i class="left">{{ formattedDate(noteDetail.createdAt) }}</i>
                    <i class="material-icons edit-icon cursor-pointer" @click="triggerEdit(index)">edit</i>
                    <i class="material-icons delete-icon cursor-pointer" @click="triggerDelete(index)">delete</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'noteCard',
    props: ['noteUpdated'],
    data: function () {
        return {
            noteDetails: []
        }
    },
    methods: {
        loadNotes() {
            const storedNotes = localStorage.getItem('notes');
            if (storedNotes) {
                this.noteDetails = JSON.parse(storedNotes);
            }
        },
        formattedDate(dateString) {
            const date = new Date(dateString);
            const options = {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            return date.toLocaleString('en-US', options);
        },
        triggerEdit(index) {
            const noteDetails = this.noteDetails[index];
            this.$emit('editNote', { index, noteDetails });
        },
        triggerDelete(index) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d13737',
                confirmButtonText: 'Yes, Delete'
            }).then((result) => {
                if (result.value) {
                    this.noteDetails.splice(index, 1);
                    localStorage.setItem('notes', JSON.stringify(this.noteDetails));
                    this.$swal(
                        'Deleted!',
                        'Your note has been deleted.',
                        'success'
                    )
                }
            });
        }
    },
    mounted() {
        this.loadNotes();
    },
    watch: {
        noteUpdated: function () {
            this.loadNotes();
        }
    }
}
</script>