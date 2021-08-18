class stack_typing {
  constructor(
    output_element,
    get_all_sentence,
    writeSpeed,
    removeSpeed,
    waitSpeed,
    iterationCount
  ) {
    this.all_sentence = get_all_sentence;
    this.output_element = output_element;
    this.iterationCount = iterationCount;
    this.current_sentence = '';
    this.output_sentence = '';
    this.removing_sentence = false;
    this.write_speed = writeSpeed;
    this.remove_speed = removeSpeed;
    this.wait_speed = waitSpeed;
    this.current_speed = 0;
    this.initial_index = 0;
    this.current_index = 0;
    this.round = 0;
  }

  writting() {
    this.output_sentence = this.current_sentence.substr(
      0,
      this.output_sentence.length + 1
    );
  }

  removing() {
    this.output_sentence = this.current_sentence.substr(
      0,
      this.output_sentence.length - 1
    );
  }

  typing() {
    this.current_index = this.initial_index % this.all_sentence.length;
    this.current_sentence = this.all_sentence[this.current_index];

    if (this.removing_sentence) {
      this.removing();
      this.current_speed = this.remove_speed;
    } else {
      this.writting();
      this.current_speed = this.write_speed;
    }
    if (this.output_sentence.length > 1) {
      this.output_element.parentElement.children.item(2).style.display =
        'unset';
    }
    if (this.output_sentence == this.current_sentence) {
      this.removing_sentence = true;
      this.current_speed = this.wait_speed;
      this.output_element.parentElement.children.item(2).style.display = 'none';

      setTimeout(() => {
        this.expand_div.animate(
          [
            {
              transform: 'scaleY(100%)',
            },

            {
              transform: 'scaleY(0%)',
            },
          ],
          { duration: 500, iterations: 'Infinity', direction: 'alternate' }
        );
        setTimeout(() => {
          this.expand_div.animate(
            [
              {
                transform: 'scaleY(100%)',
              },

              {
                transform: 'scaleY(100%)',
              },
            ],
            { duration: 1000, iterations: 'Infinity', direction: 'alternate' }
          );
        }, this.wait_speed - 250);
      }, 50);
    } else if (this.output_sentence == '') {
      this.removing_sentence = false;
      this.initial_index++;
    }
    this.makeOutput();
    this.timeout = setTimeout(() => this.typing(), this.current_speed);
    this.clearTimeout();
  }

  makeOutput() {
    this.applyStyle();
    const make_outputs = this.output_sentence
      .split('')
      .map((c) => `<span class="typing_character">${c}</span>`);
    this.output_element.innerHTML =
      `<span style="padding:0.1px"></span>` + make_outputs.join('');
    if (this.output_element.parentElement.childElementCount < 2) {
      const expand_div = document.createElement('div');
      expand_div.style.position = 'absolute';
      expand_div.style.top = 0;
      expand_div.style.transition = `all .15s`;
      expand_div.className = 'write_expand';
      expand_div.innerText = '|';
      this.expand_div = expand_div;
      this.output_element.parentElement.appendChild(expand_div);

      const stars_div = document.createElement('div');
      stars_div.className += 'all_stars';
      stars_div.style.position = 'absolute';
      stars_div.style.bottom = '101%';
      stars_div.style.fontSize = '5px';
      stars_div.style.width = '30px';
      stars_div.style.height = '30px';
      stars_div.style.display = 'none';
      stars_div.animate(
        [
          {
            opacity: '.10',
          },
          {
            opacity: '.70',
          },
        ],
        {
          duration: 1000,
          iterations: 'Infinity',
          direction: 'alternate',
        }
      );
      this.stars_div = stars_div;
      for (let i = 0; i < 25; i++) {
        stars_div.innerHTML += `<small class="stack_star">*</small>`;
      }
      this.output_element.parentElement.appendChild(stars_div);
    }

    this.stars_div.style.left = this.output_element.clientWidth - 10 + 'px';
    this.expand_div.style.left = this.output_element.clientWidth + 'px';

    // Animation
    const all_stack_star = document.querySelectorAll('.stack_star');
    all_stack_star.forEach((ele, i) => {
      ele.style.position = 'absolute';
      ele.style.transition = 'all .4s';
      ele.style.top = Math.round(Math.random() * 40) + 'px';
      ele.style.right = Math.round(Math.random() * 40) + 'px';
    });
  }

  applyStyle() {
    this.output_element.parentElement.style.position = 'relative';
    this.output_element.style.display = 'inline-block';
  }

  clearTimeout() {
    if (
      this.all_sentence[this.all_sentence.length - 1] ==
        this.current_sentence &&
      this.current_sentence == this.output_sentence &&
      this.iterationCount
    ) {
      this.round++;
      if (this.round == this.iterationCount) {
        clearTimeout(this.timeout);
        this.expand_div.style.display = 'none';
      }
    }
  }
}

document.querySelectorAll('.stack_typing').forEach((typing) => {
  typing.style.margin = '0px';
  typing.style.padding = '0px';
  const { writeSpeed, removeSpeed, waitSpeed, iterationCount } = typing.dataset;
  const all_element_text = [];
  typing.children.item(0).childNodes.forEach((element) => {
    if (element.textContent.trim().length) {
      all_element_text.push(element.textContent.trim());
    }
  });
  const newTyping = new stack_typing(
    typing.children.item(0),
    all_element_text,
    writeSpeed,
    removeSpeed,
    waitSpeed,
    iterationCount
  );
  newTyping.typing();
});
