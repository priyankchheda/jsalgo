document.getElementById('delete-article').addEventListener('click', function(e) {
  fetch(`/article/${this.dataset.id}/delete`, { method: 'DELETE' })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  window.location.href = '/';
});