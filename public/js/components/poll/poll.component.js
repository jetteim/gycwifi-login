  app.component('poll', {
    bindings: {
      poll: '<'
    },
    templateUrl: "templates/poll.html",
    controller: function($http, $scope, $rootScope, apiService) {
      $scope.templatePath = '/templates/' + $rootScope.template + '/poll.html';
      var self = this;
      $scope.allowedRequest = 'get'
      apiService.hal_availability_check()
        .then(function(data) {
          apiService.api_availability_check().then(function(data) {
            $scope.allowedRequest = data ? 'post' : 'get'
          })
        })

      this._cookResult = function(selected) {
        var result = {};
        if (selected) {
          result = {
            poll_id: selected.id,
            client_id: selected.client_id,
            questions: []
          };

          var questions = selected.questions;
          if (questions) {
            questions.forEach((question) => {
              result.questions.push({
                id: question.id,
                answers: self._getQuestionResults(question)
              })
            });
          };
        }
        return result
      };

      this._getQuestionResults = function(question) {
        switch (question.question_type) {
          case 'radio':
            return [question.answer];
            break;
          case 'checkbox':
            return question.answers.filter(function(answer) {
              return answer.selected == true
            });
          case 'switch':
            return question.answers.filter(function(answer) {
              return answer.selected == true
            })
        }
      };

      this.send = function() {
        return apiService.sendPoll(this._cookResult(this.poll), $scope.allowedRequest)
      };

      $scope.$on('sendPoll', function(event, callBack) {
        self.send()
          .then(function(data) {
            if (data.data && (data.data.status !== 'error')) {
              callBack({
                error: 'poll results sent'
              })
            } else {
              callBack({
                error: e
              })
            }
          })
          .catch(function(e) {
            callBack({
              error: e
            })
          })
      });
      $scope.poll = this.poll
    }

  });
