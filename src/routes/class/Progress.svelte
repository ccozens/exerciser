<script>
    import { progress } from './Progress';
    let percentage = 0;
    $progress.subscribe((value) => {
      percentage = value;
    });
  </script>

  <main>
    <div class="progress-bar" style="width: {percentage}%"></div>
  </main>