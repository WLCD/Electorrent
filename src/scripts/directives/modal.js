angular.module('torrentApp').directive('modal', function() {
    return {
        templateUrl: template,
        replace: true,
        transclude: true,
        scope: {
            title: '@',
            btnOk: '@',
            btnCancel: '@',
            icon: '@',
            approve: '&',
            deny: '&',
            hidden: '&',
            show: '&',
            after: '=',
            data: '=',
        },
        restrict: 'E',
        link: link
    };

    function template(elem, attrs) {
        return attrs.templateUrl || 'some/path/default.html'
    }

    function link(scope, element/*, attrs*/) {
        var accepted = false

        $(element).modal({
            onDeny: function () {
                accepted = false
                return scope.deny()
            },
            onApprove: function () {
                accepted = true
                return scope.approve()
            },
            onHidden: function () {
                clearForm(element)
                scope.after && scope.after(accepted)
                return scope.hidden()
            },
            onShow: function() {
                accepted = false
                scope.show()
            },
            onVisible: function() {
                $(element).modal('refresh')
            },
            closable: false,
            duration: 150
        });

        scope.applyAndClose = function() {
          if (scope.approve()) {
            $(element).modal('hide')
          }
        }

        scope.$on("$destroy", function() {
            element.remove();
        });
    }

    function clearForm(element){
        $(element).form('clear');
        $(element).find('.error.message').empty()
    }

});
