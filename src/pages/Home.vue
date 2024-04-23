<template>
	<div class="row">
		<div class="col s6 m3 l3">
			<div class="card">
				<h6 class="center pad5"><strong>Add New Note</strong></h6>
				<a class="btn-floating halfway-fab waves-effect waves-light modal-trigger add-icon" href="#noteModal">
					<i class="material-icons">add</i></a>
				<div class="card-content">
					<p>Add a new note by clicking the plus icon below.</p>
				</div>
			</div>
		</div>
		<div id="noteModal" class="modal create-modal">
			<div class="modal-content">
				<h4 class="center"><strong>{{ editNote === true ? 'Edit' : 'Add' }} Note</strong></h4>
				<div class="row">
					<form class="col s12">
						<div class="row">
							<div class="input-field col s6">
								<i class="material-icons prefix">title</i>
								<input id="note_title" type="text" placeholder="Note Title" v-model="noteTitle">
							</div>
							<div class="input-field col s12">
								<i class="material-icons prefix">event_note</i>
								<textarea id="note_desc" class="materialize-textarea" placeholder="Note Description"
									v-model="noteDesc"></textarea>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<a href="#!" class="modal-close waves-effect waves-red btn-flat" @click="clearDetails">
					<i class="material-icons">close</i></a>
				<a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="saveDetails">
					<i class="material-icons">done</i></a>
			</div>
		</div>
		<NoteCard @editNote="openModal" :noteUpdated="noteUpdated"/>
	</div>
</template>

<script>
import M from 'materialize-css';
import NoteCard from '@/components/NoteCard';
export default {
	name: 'homePage',
	components: {
		NoteCard
	},
	data: function () {
		return {
			noteTitle: '',
			noteDesc: '',
			editNote: false,
			editIndex: -1,
			noteUpdated: false
		}
	},
	methods: {
		clearDetails() {
			this.noteTitle = '';
			this.noteDesc = '';
			this.editNote = false;
		},
		saveDetails() {
			let notes = JSON.parse(localStorage.getItem('notes')) || [];
			if (this.noteTitle.trim() === '' || this.noteDesc.trim() === '') {
				this.$swal(
					'Not Allowed',
					'Note title and description cannot be empty!',
					'warning'
				);
				return;
			}
			if (this.editNote) {
				if (this.editIndex !== -1 && this.editIndex < notes.length) {
					notes[this.editIndex].noteTitle = this.noteTitle;
					notes[this.editIndex].noteDesc = this.noteDesc;
					notes[this.editIndex].createdAt = new Date().toISOString();
				}
			} else {
				const noteDetails = {
					noteTitle: this.noteTitle,
					noteDesc: this.noteDesc,
					createdAt: new Date().toISOString()
				};
				notes.push(noteDetails);
			}
			localStorage.setItem('notes', JSON.stringify(notes));
			this.noteTitle = '';
			this.noteDesc = '';
			this.$swal(
				'Saved!',
				'Your note has been saved.',
				'success'
			)
			this.editNote = false;
			this.noteUpdated = true;
		},
		openModal({ index, noteDetails }) {
			M.Modal.getInstance(document.getElementById('noteModal')).open();
			this.editNote = true;
			this.editIndex = index;
			this.noteTitle = noteDetails.noteTitle;
			this.noteDesc = noteDetails.noteDesc;
		}
	},
	mounted() {
		M.textareaAutoResize(document.querySelector('#note_desc'));
		this.noteUpdated = false;
	},
	updated() {
		M.Modal.init(document.querySelector('create-modal'));
		this.noteUpdated = false;
	}
}
</script>
